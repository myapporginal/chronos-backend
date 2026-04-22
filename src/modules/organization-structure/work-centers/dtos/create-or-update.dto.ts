import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateOrUpdateWorkCenterDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @Expose({ name: 'name' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @Expose({ name: 'address' })
  address?: string | null;

  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @Expose({ name: 'city' })
  city?: string | null;

  @IsOptional()
  @IsString({ message: 'El departamento debe ser una cadena de texto' })
  @Expose({ name: 'department' })
  department?: string | null;

  @IsOptional()
  @IsNumber({}, { message: 'El número de empleados debe ser un número' })
  @Min(0, { message: 'El número de empleados debe ser mayor o igual a 0' })
  @Expose({ name: 'employee_count' })
  employeeCount?: number | null;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  @Expose({ name: 'is_main' })
  isMain?: boolean | null;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  @Expose({ name: 'is_active' })
  isActive?: boolean | null;
}
