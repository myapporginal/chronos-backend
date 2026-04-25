import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { PositionsModule } from './positions/positions.module';
import { WorkCentersModule } from './work-centers/work-centers.module';
import { RouterModule } from '@nestjs/core';
import { WorkAreasModule } from './work-areas/work-areas.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    CompaniesModule,
    PositionsModule,
    WorkCentersModule,
    WorkAreasModule,
    EmployeesModule,
    RouterModule.register([
      {
        path: 'organization-structure',
        children: [
          { path: '', module: CompaniesModule },
          { path: '', module: PositionsModule },
          { path: '', module: WorkCentersModule },
          { path: '', module: WorkAreasModule },
          { path: '', module: EmployeesModule },
        ],
      },
    ]),
  ],
})
export class OrganizationStructureModule {}
