import { Body, Controller, Param, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateOrUpdateCompanyDto } from './dtos/create-or-update.dto';
import { Company } from './companies.entity';
import { plainToInstance } from 'class-transformer';
import { ParamsIdDto } from '@common/dtos/params-id.dto';

@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Put(':id')
  async save(
    @Param() params: ParamsIdDto,
    @Body() createOrUpdateCompanyDto: CreateOrUpdateCompanyDto,
  ) {
    const company = plainToInstance(Company, createOrUpdateCompanyDto, {
      ignoreDecorators: true,
    });
    company.id = params.id;
    return {
      detail: 'Compañia creada correctamente',
      data: await this.companiesService.save(company),
    };
  }
}
