import {
  Brackets,
  FindOneOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { FilterDto, FilterOperator } from '@common/dtos/filter.dto';
import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { PaginatedResponse } from '@common/dtos/paginated-response.dto';
import { NotFoundException } from '@common/exceptions/not-found.exception';

export interface FindAllOptions {
  relations?: string[];
  where?: ObjectLiteral;
}

/**
 * Generic base service that provides standard CRUD operations.
 * Extend this class and inject the TypeORM repository for your entity.
 *
 * @typeParam T - Entity type managed by this service.
 */
export abstract class BaseCrudService<T extends ObjectLiteral> {
  protected readonly entityName: string;

  constructor(protected readonly repository: Repository<T>) {
    this.entityName = repository.metadata.name;
  }

  async findAll(
    query: PaginationQueryDto & { parsedFilters?: FilterDto[] },
    options?: FindAllOptions,
  ): Promise<PaginatedResponse<T>> {
    const { offset, limit, parsedFilters = [] } = query;

    const alias = this.entityName.toLowerCase();
    const qb = this.repository.createQueryBuilder(alias);

    // Load requested relations via LEFT JOIN
    if (options?.relations) {
      for (const relation of options.relations) {
        qb.leftJoinAndSelect(`${alias}.${relation}`, relation);
      }
    }

    // Load the where conditions
    if (options?.where) {
      Object.entries(options.where).forEach(([key, value]) => {
        const safeValue = value as unknown;

        qb.andWhere(`${alias}.${key} = :internal_${key}`, {
          [`internal_${key}`]: safeValue,
        });
      });
    }

    this.applyFilters(qb, alias, parsedFilters);

    const isPaginated = limit !== undefined && offset !== undefined;

    if (isPaginated) {
      qb.skip(offset).take(limit);
    }

    // Default sort: newest first
    qb.orderBy(`${alias}.createdAt`, 'DESC');

    const [data, totalItems] = await qb.getManyAndCount();

    if (!isPaginated) {
      return { data, metadata: null };
    }

    return {
      data,
      total: totalItems,
      limit,
      offset,
    };
  }

  async findById(id: string, relations?: string[]): Promise<T> {
    const findOptions: FindOneOptions<T> = {
      where: { id } as unknown as FindOneOptions<T>['where'],
      ...(relations?.length ? { relations } : {}),
    };

    const entity = await this.repository.findOne(findOptions);

    if (!entity) {
      throw new NotFoundException([
        {
          field: 'id',
          message: `${this.entityName} con id "${id}" no fue encontrado.`,
        },
      ]);
    }

    return entity;
  }

  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findById(id);
    await this.repository.softRemove(entity);
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /**
   * Applies all provided filter conditions to the query builder using AND logic.
   * Each filter maps to a typed SQL condition based on its operator.
   */
  protected applyFilters(
    qb: SelectQueryBuilder<T>,
    alias: string,
    filters: FilterDto[],
  ): void {
    if (!filters.length) return;

    qb.andWhere(
      new Brackets((bracketQb) => {
        filters.forEach((filter, index) => {
          const paramName = `filter_${index}`;
          const column = `${alias}.${filter.field}`;

          switch (filter.operator) {
            case FilterOperator.EQUALS:
              bracketQb.andWhere(`${column} = :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.NOT_EQUALS:
              bracketQb.andWhere(`${column} != :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.GREATER_THAN:
              bracketQb.andWhere(`${column} > :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.LESS_THAN:
              bracketQb.andWhere(`${column} < :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.GREATER_THAN_OR_EQUAL:
              bracketQb.andWhere(`${column} >= :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.LESS_THAN_OR_EQUAL:
              bracketQb.andWhere(`${column} <= :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.LIKE:
              bracketQb.andWhere(`${column} ILIKE :${paramName}`, {
                [paramName]: `%${String(filter.value)}%`,
              });
              break;

            case FilterOperator.IN:
              bracketQb.andWhere(`${column} IN (:...${paramName})`, {
                [paramName]: Array.isArray(filter.value)
                  ? filter.value
                  : [filter.value],
              });
              break;

            case FilterOperator.IS_NULL:
              bracketQb.andWhere(`${column} IS NULL`);
              break;

            case FilterOperator.IS_NOT_NULL:
              bracketQb.andWhere(`${column} IS NOT NULL`);
              break;
          }
        });
      }),
    );
  }
}
