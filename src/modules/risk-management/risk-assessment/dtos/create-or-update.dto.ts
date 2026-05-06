import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { RiskStatus } from '@modules/risk-management/common/utils/enums';
import { Expose, Type } from 'class-transformer';

export class CreateOrUpdateRiskAssessmentDto {
  @IsOptional()
  @IsUUID()
  @Expose({ name: 'work_center_id' })
  workCenterId!: string | null;

  @IsOptional()
  @IsUUID()
  @Expose({ name: 'work_area_id' })
  workAreaId!: string | null;

  @IsOptional()
  @IsUUID()
  @Expose({ name: 'position_id' })
  positionId!: string | null;

  @IsUUID()
  @Expose({ name: 'hazard_id' })
  hazardId!: string;

  @IsUUID()
  @Expose({ name: 'responsible_id' })
  responsibleId!: string;

  @IsString()
  @MaxLength(200, {
    message: 'El nombre del proceso no puede exceder los 200 caracteres',
  })
  @Expose({ name: 'process_name' })
  processName!: string;

  @IsString()
  @MaxLength(300, {
    message: 'La actividad no puede exceder los 300 caracteres',
  })
  @Expose({ name: 'activity' })
  activity!: string;

  @IsBoolean()
  @Expose({ name: 'is_routine' })
  isRoutine!: boolean;

  @IsNumber()
  @Expose({ name: 'workers_exposed' })
  workersExposed!: number;

  @IsString()
  @IsOptional()
  @MaxLength(500, {
    message: 'Los controles existentes no pueden exceder los 500 caracteres',
  })
  @Expose({ name: 'existing_controls' })
  existingControls!: string | null;

  @IsNumber()
  @Expose({ name: 'nd' })
  nd!: number;

  @IsNumber()
  @Expose({ name: 'ne' })
  ne!: number;

  @IsNumber()
  @Expose({ name: 'nc' })
  nc!: number;

  @IsEnum(RiskStatus, {
    message:
      'Estado no valido, debe ser uno de los siguientes: identified, in_treatment, controlled, residual',
  })
  @Expose({ name: 'status' })
  status!: RiskStatus;

  @IsOptional()
  @Type(() => Date)
  @Expose({ name: 'last_review_date' })
  lastReviewDate!: Date | null;

  @IsOptional()
  @Type(() => Date)
  @Expose({ name: 'next_review_date' })
  nextReviewDate!: Date | null;
}
