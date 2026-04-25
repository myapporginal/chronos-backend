import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { WorkCenter } from '../work-centers/work-center.entity';
import { Position } from '../positions/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, WorkCenter, Position])],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
