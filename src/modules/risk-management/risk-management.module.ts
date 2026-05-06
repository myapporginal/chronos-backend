import { Module } from '@nestjs/common';
import { HazardFamiliesModule } from './hazard-families/hazard-families.module';
import { RouterModule } from '@nestjs/core';
import { HazardsModule } from './hazards/hazards.module';
import { RiskAssessmentModule } from './risk-assessment/risk-assessment.module';

@Module({
  imports: [
    HazardFamiliesModule,
    HazardsModule,
    RiskAssessmentModule,
    RouterModule.register([
      {
        path: 'risk-management',
        children: [
          { path: '', module: HazardFamiliesModule },
          { path: '', module: HazardsModule },
          { path: '', module: RiskAssessmentModule },
        ],
      },
    ]),
  ],
})
export class RiskManagementModule {}
