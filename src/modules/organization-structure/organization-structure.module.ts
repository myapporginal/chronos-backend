import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { PositionsModule } from './positions/positions.module';
import { WorkCentersModule } from './work-centers/work-centers.module';
import { RouterModule } from '@nestjs/core';
import { WorkAreasModule } from './work-areas/work-areas.module';

@Module({
  imports: [
    CompaniesModule,
    PositionsModule,
    WorkCentersModule,
    WorkAreasModule,
    RouterModule.register([
      {
        path: 'organization-structure',
        children: [
          { path: '', module: CompaniesModule },
          { path: '', module: PositionsModule },
          { path: '', module: WorkCentersModule },
          { path: '', module: WorkAreasModule },
        ],
      },
    ]),
  ],
})
export class OrganizationStructureModule {}
