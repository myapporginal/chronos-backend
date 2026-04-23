import { Module } from '@nestjs/common';
import { WorkAreasController } from './work-areas.controller';
import { WorkAreasService } from './work-areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkArea } from './work-area.entity';
import { WorkCenter } from '../work-centers/work-center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkArea, WorkCenter])],
  controllers: [WorkAreasController],
  providers: [WorkAreasService],
})
export class WorkAreasModule {}
