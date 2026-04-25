import { Module } from '@nestjs/common';
import { HazardFamiliesModule } from './hazard-families/hazard-families.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    HazardFamiliesModule,
    RouterModule.register([
      {
        path: 'risk-management',
        children: [{ path: '', module: HazardFamiliesModule }],
      },
    ]),
  ],
})
export class RiskManagementModule {}
