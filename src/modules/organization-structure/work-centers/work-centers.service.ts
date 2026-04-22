import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkCenter } from './work-center.entity';
import { Repository } from 'typeorm';
import { FilterDto, PaginatedResponse, PaginationQueryDto } from '@common/dtos';
import { BaseCrudService } from '@common/utils/services/base-crud.service';

@Injectable()
export class WorkCentersService extends BaseCrudService<WorkCenter> {
  constructor(
    @InjectRepository(WorkCenter) repository: Repository<WorkCenter>,
  ) {
    super(repository);
  }

  async findAllForTenant(
    query: PaginationQueryDto & { parsedFilters?: FilterDto[] },
    tenantId: string,
  ): Promise<PaginatedResponse<WorkCenter>> {
    const { limit, offset, parsedFilters = [] } = query;

    const alias = this.entityName.toLowerCase();
    const qb = this.repository.createQueryBuilder(alias);

    qb.where('company_id = :tenantId', { tenantId });

    this.applyFilters(qb, alias, parsedFilters);

    const isPaginated = limit !== undefined && offset !== undefined;

    if (isPaginated) {
      qb.skip(offset).take(limit);
    }

    qb.orderBy(`${alias}.createdAt`, 'DESC');

    const [data, total] = await qb.getManyAndCount();

    if (!isPaginated) {
      return { data, metadata: null };
    }

    return {
      data,
      total,
      limit,
      offset,
    };
  }
}
