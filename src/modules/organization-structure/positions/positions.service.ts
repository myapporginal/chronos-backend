import { BaseCrudService } from '@common/utils/services/base-crud.service';
import { Injectable } from '@nestjs/common';
import { Position } from './position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkCenter } from '../work-centers/work-center.entity';
import { FilterDto } from '@common/dtos/filter.dto';
import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { PaginatedResponse } from '@common/dtos/paginated-response.dto';
import { NotFoundException } from '@common/exceptions/not-found.exception';

@Injectable()
export class PositionsService extends BaseCrudService<Position> {
  constructor(
    @InjectRepository(Position) repository: Repository<Position>,
    @InjectRepository(WorkCenter)
    private workCenterRepository: Repository<WorkCenter>,
  ) {
    super(repository);
  }

  async findAllForTenant(
    query: PaginationQueryDto & { parsedFilters?: FilterDto[] },
    tenantId: string,
  ): Promise<PaginatedResponse<Position>> {
    const { offset, limit, parsedFilters = [] } = query;

    const alias = this.entityName.toLowerCase();
    const qb = this.repository.createQueryBuilder(alias);

    qb.innerJoinAndSelect(`${alias}.workCenter`, 'workCenter');
    qb.where('workCenter.company_id = :tenantId', { tenantId });

    this.applyFilters(qb, alias, parsedFilters);

    const isPaginated = limit !== undefined && offset !== undefined;

    if (isPaginated) {
      qb.skip(offset).take(limit);
    }

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

  async findByIdForTenant(id: string, tenantId: string): Promise<Position> {
    const qb = this.repository.createQueryBuilder('position');
    qb.innerJoinAndSelect('position.workCenter', 'workCenter');
    qb.where('position.id = :id', { id });
    qb.andWhere('workCenter.companyId = :tenantId', { tenantId });

    const entity = await qb.getOne();

    if (!entity) {
      throw new NotFoundException([
        {
          field: 'id',
          message: `El cargo con id "${id}" no fue encontrado en tu compañía.`,
        },
      ]);
    }

    return entity;
  }

  async saveForTenant(position: Position, tenantId: string): Promise<Position> {
    // Validate that the work center provided belongs to the current tenant
    const workCenter = await this.workCenterRepository.findOne({
      where: { id: position.workCenterId },
    });

    if (!workCenter || workCenter.companyId !== tenantId) {
      throw new NotFoundException([
        {
          field: 'work_center_id',
          message: 'El centro de trabajo especificado no fue encontrado.',
        },
      ]);
    }

    return this.save(position);
  }
}
