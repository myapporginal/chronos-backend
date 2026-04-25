import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IsUnique } from '@common/decorators/is-unique.decorator';
import { Company } from '../companies.entity';
import { IsUUID } from 'class-validator';

export class CreateOrUpdateCompanyDto {
  @IsUUID('4', { message: 'El id de la compañía debe ser un UUID.' })
  @IsOptional()
  @Expose({ name: 'id' })
  id?: string | null;

  @IsNotEmpty({ message: 'El NIT es requerido.' })
  @IsString({ message: 'El NIT debe ser una cadena de texto.' })
  @IsUnique({ entity: Company })
  nit!: string;

  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name!: string;

  @IsNotEmpty({ message: 'La actividad económica es requerida.' })
  @IsString({ message: 'La actividad económica debe ser una cadena de texto.' })
  @MaxLength(10, {
    message: 'La actividad económica debe tener máximo 10 caracteres.',
  })
  @Expose({ name: 'economic_activity' })
  economicActivity!: string;

  @IsNumber({}, { message: 'La clase de riesgo debe ser un número.' })
  @Min(1, { message: 'La clase de riesgo debe ser mayor o igual a 1.' })
  @Max(5, { message: 'La clase de riesgo debe ser menor o igual a 5.' })
  @Expose({ name: 'risk_class' })
  riskClass!: number;

  @IsNumber({}, { message: 'El número de empleados debe ser un número.' })
  @Min(0, { message: 'El número de empleados debe ser mayor o igual a 0.' })
  @Expose({ name: 'employee_count' })
  employeeCount!: number;

  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @MaxLength(100, {
    message: 'La ciudad debe tener máximo 100 caracteres.',
  })
  city!: string;

  @IsString({ message: 'El departamento debe ser una cadena de texto.' })
  @MaxLength(100, {
    message: 'El departamento debe tener máximo 100 caracteres.',
  })
  department!: string;

  @IsString({ message: 'El nombre de la ARL debe ser una cadena de texto.' })
  @IsOptional()
  @Expose({ name: 'arl_name' })
  @MaxLength(100, {
    message: 'El nombre de la ARL debe tener máximo 100 caracteres.',
  })
  arlName!: string | null;

  @IsBoolean({ message: 'El estado debe ser un booleano.' })
  @IsOptional()
  @Expose({ name: 'is_active' })
  isActive!: boolean;
}
