import { Module } from '@nestjs/common';
import { HazardFamiliesModule } from './hazard-families/hazard-families.module';
import { RouterModule } from '@nestjs/core';
import { HazardsModule } from './hazards/hazards.module';

@Module({
  imports: [
    HazardFamiliesModule,
    HazardsModule,
    RouterModule.register([
      {
        path: 'risk-management',
        children: [
          { path: '', module: HazardFamiliesModule },
          { path: '', module: HazardsModule },
        ],
      },
    ]),
  ],
})
export class RiskManagementModule {}
