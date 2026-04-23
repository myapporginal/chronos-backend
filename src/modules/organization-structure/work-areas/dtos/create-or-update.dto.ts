import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateOrUpdateWorkAreaDto {
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
}
