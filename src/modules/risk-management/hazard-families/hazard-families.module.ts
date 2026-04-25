import { Module } from '@nestjs/common';
import { HazardFamiliesController } from './hazard-families.controller';
import { HazardFamiliesService } from './hazard-families.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HazardFamily } from './hazard-family.entity';
import { Hazard } from '../hazards/hazard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HazardFamily, Hazard])],
  controllers: [HazardFamiliesController],
  providers: [HazardFamiliesService],
})
export class HazardFamiliesModule {}
