import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hazard } from './hazard.entity';
import { FilterDto, PaginatedResponse, PaginationQueryDto } from '@common/dtos';
import { BaseCrudService } from '@common/utils/services/base-crud.service';

@Injectable()
export class HazardsService extends BaseCrudService<Hazard> {
  constructor(@InjectRepository(Hazard) repository: Repository<Hazard>) {
    super(repository);
  }

  async findAllForTenant(
    query: PaginationQueryDto & { parsedFilters?: FilterDto[] },
    tenantId: string,
  ): Promise<PaginatedResponse<Hazard>> {
    const { limit, offset, parsedFilters = [] } = query;

    const alias = this.entityName.toLowerCase();
    const qb = this.repository.createQueryBuilder(alias);

    qb.where(`${alias}.companyId = :tenantId`, { tenantId });
    qb.orWhere(`${alias}.companyId IS NULL`);

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
