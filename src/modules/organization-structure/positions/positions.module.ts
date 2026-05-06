import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';
import { WorkCenter } from '../work-centers/work-center.entity';
import { WorkArea } from '../work-areas/work-area.entity';
import { Employee } from '../employees/employee.entity';
import { RiskAssessment } from '@modules/risk-management/risk-assessment/risk-assessment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Position,
      WorkCenter,
      WorkArea,
      Employee,
      RiskAssessment,
    ]),
  ],
  controllers: [PositionsController],
  providers: [PositionsService],
})
export class PositionsModule {}
