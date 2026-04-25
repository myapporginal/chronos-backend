import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from './employee.entity';
import { BaseCrudService } from '@common/utils/services/base-crud.service';
import { FilterDto, PaginatedResponse, PaginationQueryDto } from '@common/dtos';
import { NotFoundException } from '@common/exceptions/not-found.exception';
import { WorkCenter } from '../work-centers/work-center.entity';
import { Position } from '../positions/position.entity';

@Injectable()
export class EmployeesService extends BaseCrudService<Employee> {
  constructor(
    @InjectRepository(Employee)
    repository: Repository<Employee>,
    @InjectRepository(WorkCenter)
    private readonly workCenterRepository: Repository<WorkCenter>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {
    super(repository);
  }

  async findAllForTenant(
    query: PaginationQueryDto & { parsedFilters?: FilterDto[] },
    tenantId: string,
  ): Promise<PaginatedResponse<Employee>> {
    const { limit, offset, parsedFilters = [] } = query;

    const alias = this.entityName.toLowerCase();
    const qb = this.repository.createQueryBuilder(alias);

    qb.innerJoinAndSelect(`${alias}.workCenter`, 'workCenter');
    qb.where('workCenter.company_id = :tenantId', { tenantId });

    this.applyFilters(qb, alias, parsedFilters);

    const isPaginated = limit !== undefined && offset !== undefined;

    if (isPaginated) {
      qb.skip(offset).take(limit);
    }

    qb.orderBy(`${alias}.created_at`, 'DESC');

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

  async saveForTenant(employee: Employee, tenantId: string): Promise<Employee> {
    // Validate if the position exists and belongs to the tenant
    if (employee.positionId) {
      const position = await this.positionRepository.findOne({
        where: { id: employee.positionId },
        relations: { workCenter: true },
      });

      if (!position || position.workCenter.companyId !== tenantId) {
        throw new NotFoundException([
          {
            field: 'position_id',
            message: 'El puesto especificado no fue encontrado.',
          },
        ]);
      }
    }

    // Validate if the work center exists and belongs to the tenant
    const workCenter = await this.workCenterRepository.findOne({
      where: { id: employee.workCenterId },
    });

    if (!workCenter || workCenter.companyId !== tenantId) {
      throw new NotFoundException([
        {
          field: 'work_center_id',
          message: 'El centro de trabajo especificado no fue encontrado.',
        },
      ]);
    }

    return this.save(employee);
  }
}
