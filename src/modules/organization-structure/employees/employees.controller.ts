import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { FilterDto, PaginationQueryDto } from '@common/dtos';
import { ParseFilterPipe } from '@common/pipes/parse-filter.pipe';
import * as tenantPermissionsGuard from '@common/guards/tenant-permissions.guard';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import { RequirePermissions } from '@common/decorators/require-permissions.decorator';
import { ParamsIdDto } from '@common/dtos/params-id.dto';
import { ServicePayload } from '@common/interfaces/api-response.interface';
import { Employee } from './employee.entity';
import { plainToInstance } from 'class-transformer';
import { CreateOrUpdateEmployeeDto } from './dtos/create-or-update.dto';

@Controller({ path: 'employees', version: '1' })
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Get()
  @RequirePermissions('view:employees:own-company')
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('filters', ParseFilterPipe) parsedFilters: FilterDto[],
    @Request() req: tenantPermissionsGuard.RequestWithUser,
  ) {
    if (!req.tenantId) {
      throw new UnauthorizedException();
    }

    return await this.service.findAllForTenant(
      { ...query, parsedFilters },
      req.tenantId,
    );
  }

  @Put(':id')
  @RequirePermissions('save:employees:own-company')
  async save(
    @Param() params: ParamsIdDto,
    @Body() dto: CreateOrUpdateEmployeeDto,
    @Request() req: tenantPermissionsGuard.RequestWithUser,
  ): Promise<ServicePayload<Employee>> {
    if (!req.tenantId) {
      throw new UnauthorizedException();
    }

    const employee = plainToInstance(Employee, dto, {
      ignoreDecorators: true,
    });
    employee.id = params.id;

    return {
      detail: 'Empleado guardado correctamente.',
      data: await this.service.saveForTenant(employee, req.tenantId),
    };
  }
}
