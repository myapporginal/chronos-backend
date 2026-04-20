import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateOrUpdatePositionDto {
  @IsNotEmpty({ message: 'El centro de trabajo es obligatorio' })
  @IsUUID()
  @Expose({ name: 'work_center_id' })
  workCenterId!: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3)
  name!: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  description?: string | null;

  @IsOptional()
  @IsNumber({}, { message: 'El nivel de riesgo debe ser un número' })
  @Min(1, { message: 'El nivel de riesgo debe ser mayor o igual a 1' })
  @Max(5, { message: 'El nivel de riesgo debe ser menor o igual a 5' })
  @Expose({ name: 'risk_level' })
  riskLevel?: number | null;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  @Expose({ name: 'is_active' })
  isActive?: boolean;
}
