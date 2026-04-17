import { NotFoundException } from '@nestjs/common';
import {
  Brackets,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { FilterDto, FilterOperator } from '@common/dtos/filter.dto';
import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { PaginatedResponse } from '@common/dtos/paginated-response.dto';

export interface FindAllOptions {
  relations?: string[];
}

export abstract class BaseCrudService<T extends ObjectLiteral> {
  protected readonly entityName: string;

  constructor(protected readonly repository: Repository<T>) {
    this.entityName = repository.metadata.name;
  }

  async findAll(
    query: PaginationQueryDto & { parsedFilters?: FilterDto[] },
    options?: FindAllOptions,
  ): Promise<PaginatedResponse<T>> {
    const { page = 1, limit = 10, parsedFilters = [] } = query;
    const skip = (page - 1) * limit;

    const alias = this.entityName.toLowerCase();
    const qb = this.repository.createQueryBuilder(alias);

    // Load relations if specified
    if (options?.relations) {
      for (const relation of options.relations) {
        qb.leftJoinAndSelect(`${alias}.${relation}`, relation);
      }
    }

    // Apply dynamic filters
    this.applyFilters(qb, alias, parsedFilters);

    // Apply pagination
    qb.skip(skip).take(limit);

    // Default ordering by createdAt descending
    qb.orderBy(`${alias}.createdAt`, 'DESC');

    const [data, totalItems] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  async findById(id: string, relations?: string[]): Promise<T> {
    const findOptions: Record<string, unknown> = {
      where: { id } as unknown,
    };

    if (relations?.length) {
      findOptions['relations'] = relations;
    }

    const entity = await this.repository.findOne(
      findOptions as Parameters<Repository<T>['findOne']>[0],
    );

    if (!entity) {
      throw new NotFoundException(
        `${this.entityName} with id "${id}" not found`,
      );
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

  // ─── Private Helpers ───────────────────────────────────────────────

  private applyFilters(
    qb: SelectQueryBuilder<T>,
    alias: string,
    filters: FilterDto[],
  ): void {
    if (!filters.length) return;

    qb.andWhere(
      new Brackets((outerQb) => {
        filters.forEach((filter, index) => {
          const paramName = `filter_${index}`;
          const column = `${alias}.${filter.field}`;

          switch (filter.operator) {
            case FilterOperator.EQUALS:
              outerQb.andWhere(`${column} = :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.NOT_EQUALS:
              outerQb.andWhere(`${column} != :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.GREATER_THAN:
              outerQb.andWhere(`${column} > :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.LESS_THAN:
              outerQb.andWhere(`${column} < :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.GREATER_THAN_OR_EQUAL:
              outerQb.andWhere(`${column} >= :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.LESS_THAN_OR_EQUAL:
              outerQb.andWhere(`${column} <= :${paramName}`, {
                [paramName]: filter.value,
              });
              break;

            case FilterOperator.LIKE:
              outerQb.andWhere(`${column} ILIKE :${paramName}`, {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                [paramName]: `%${filter.value}%`,
              });
              break;

            case FilterOperator.IN:
              outerQb.andWhere(`${column} IN (:...${paramName})`, {
                [paramName]: Array.isArray(filter.value)
                  ? filter.value
                  : [filter.value],
              });
              break;

            case FilterOperator.IS_NULL:
              outerQb.andWhere(`${column} IS NULL`);
              break;

            case FilterOperator.IS_NOT_NULL:
              outerQb.andWhere(`${column} IS NOT NULL`);
              break;
          }
        });
      }),
    );
  }
}
