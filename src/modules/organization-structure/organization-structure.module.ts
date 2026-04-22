import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { PositionsModule } from './positions/positions.module';
import { WorkCentersModule } from './work-centers/work-centers.module';

@Module({
  imports: [CompaniesModule, PositionsModule, WorkCentersModule],
})
export class OrganizationStructureModule {}
