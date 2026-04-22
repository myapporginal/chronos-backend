import { Module } from '@nestjs/common';
import { WorkCentersService } from './work-centers.service';
import { WorkCentersController } from './work-centers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkCenter } from './work-center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkCenter])],
  providers: [WorkCentersService],
  controllers: [WorkCentersController],
})
export class WorkCentersModule {}
