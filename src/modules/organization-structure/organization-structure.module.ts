import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [CompaniesModule, PositionsModule],
})
export class OrganizationStructureModule {}
