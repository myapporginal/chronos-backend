import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateOrUpdateCompanyDto } from './dtos/create-or-update.dto';
import { Company } from './companies.entity';
import { plainToInstance } from 'class-transformer';
import { ParamsIdDto } from '@common/dtos/params-id.dto';
import { FilterDto, PaginationQueryDto } from '@common/dtos';
import { ParseFilterPipe } from '@common/pipes/parse-filter.pipe';
import { PaginatedResponse } from '@common/dtos/paginated-response.dto';
import { ServicePayload } from '@common/interfaces/api-response.interface';

@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('filters', ParseFilterPipe) parsedFilters: FilterDto[],
  ): Promise<PaginatedResponse<Company>> {
    return this.companiesService.findAll({
      ...query,
      parsedFilters,
    });
  }

  @Put(':id')
  async save(
    @Param() params: ParamsIdDto,
    @Body() dto: CreateOrUpdateCompanyDto,
  ): Promise<ServicePayload<Company>> {
    const company = plainToInstance(Company, dto, {
      ignoreDecorators: true,
    });
    company.id = params.id;

    return {
      detail: 'Empresa guardada correctamente.',
      data: await this.companiesService.save(company),
    };
  }
}
