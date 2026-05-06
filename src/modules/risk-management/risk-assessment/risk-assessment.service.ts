import { BaseCrudService } from '@common/utils/services/base-crud.service';
import { Injectable } from '@nestjs/common';
import { RiskAssessment } from './risk-assessment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterDto, PaginatedResponse, PaginationQueryDto } from '@common/dtos';
import { InterventionLevel, RiskAcceptability } from '../common/utils/enums';

@Injectable()
export class RiskAssessmentService extends BaseCrudService<RiskAssessment> {
  constructor(
    @InjectRepository(RiskAssessment) repository: Repository<RiskAssessment>,
  ) {
    super(repository);
  }

  async findAllForTenant(
    query: PaginationQueryDto & { parsedFilters?: FilterDto[] },
    tenantId: string,
  ): Promise<PaginatedResponse<RiskAssessment>> {
    const { offset, limit, parsedFilters = [] } = query;

    const alias = this.entityName.toLowerCase();
    const qb = this.repository.createQueryBuilder(alias);

    qb.where(`${alias}.companyId = :tenantId`, { tenantId });

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

  async save(entity: RiskAssessment): Promise<RiskAssessment> {
    // Calculate the np is the damage x exposure (nd x ne)
    entity.np = entity.nd * entity.ne;
    // Calculate the nr is the probability x consequence (np x nc)
    entity.nr = entity.np * entity.nc;

    const riskLevel = this.getInterventionLevel(entity.nr);
    const acceptability = this.getAcceptability(riskLevel);
    entity.interventionLevel = riskLevel;
    entity.acceptability = acceptability;
    return this.repository.save(entity);
  }

  private getInterventionLevel(nr: number): InterventionLevel {
    if (nr > 600) return InterventionLevel.I;
    if (nr > 200) return InterventionLevel.II;
    if (nr > 120) return InterventionLevel.III;
    if (nr > 20) return InterventionLevel.IV;
    return InterventionLevel.IV;
  }

  private getAcceptability(interventionLevel: InterventionLevel) {
    switch (interventionLevel) {
      case InterventionLevel.I:
        return RiskAcceptability.NOT_ACCEPTABLE;
      case InterventionLevel.II:
        return RiskAcceptability.NOT_ACCEPTABLE_WITH_CONTROLS;
      case InterventionLevel.III:
        return RiskAcceptability.ACCEPTABLE_WITH_SPECIFIC_CONTROL;
      case InterventionLevel.IV:
        return RiskAcceptability.ACCEPTABLE;
    }
  }
}
