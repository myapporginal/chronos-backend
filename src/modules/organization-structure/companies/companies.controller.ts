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
  ): Promise<Company> {
    const company = plainToInstance(Company, createOrUpdateCompanyDto);
    company.id = params.id;
    return this.companiesService.save(company);
  }
}
