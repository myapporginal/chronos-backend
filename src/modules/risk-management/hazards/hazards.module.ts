import { Module } from '@nestjs/common';
import { HazardsService } from './hazards.service';
import { HazardsController } from './hazards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hazard } from './hazard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hazard])],
  providers: [HazardsService],
  controllers: [HazardsController],
})
export class HazardsModule {}
