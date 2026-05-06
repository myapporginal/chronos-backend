import { Module } from '@nestjs/common';
import { RiskAssessmentController } from './risk-assessment.controller';
import { RiskAssessmentService } from './risk-assessment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskAssessment } from './risk-assessment.entity';
import { ControlMeasure } from '../control-measures/control-measure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskAssessment, ControlMeasure])],
  controllers: [RiskAssessmentController],
  providers: [RiskAssessmentService],
})
export class RiskAssessmentModule {}
