import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { IsUnique } from '@common/decorators/is-unique.decorator';
import { Company } from '../companies.entity';

export class CreateOrUpdateCompanyDto {
  @IsNotEmpty({ message: 'El NIT es requerido.' })
  @IsString({ message: 'El NIT debe ser una cadena de texto.' })
  @IsUnique({ entity: Company })
  nit!: string;

  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name!: string;

  @IsNotEmpty({ message: 'La actividad económica es requerida.' })
  @IsString({ message: 'La actividad económica debe ser una cadena de texto.' })
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
  city!: string;

  @IsString({ message: 'El departamento debe ser una cadena de texto.' })
  department!: string;

  @IsString({ message: 'El nombre de la ARL debe ser una cadena de texto.' })
  @IsOptional()
  @Expose({ name: 'arl_name' })
  arlName!: string | null;

  @IsBoolean({ message: 'El estado debe ser un booleano.' })
  @IsOptional()
  @Expose({ name: 'is_active' })
  isActive!: boolean;
}
