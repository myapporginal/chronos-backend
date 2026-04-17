import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { IsUnique } from '@common/decorators/is-unique.decorator';
import { Company } from '../companies.entity';

export class CreateOrUpdateCompanyDto {
  @IsString()
  @IsUnique({ entity: Company })
  nit!: string;

  @IsString()
  name!: string;

  @IsString()
  @Expose({ name: 'economic_activity' })
  economicActivity!: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @Expose({ name: 'risk_class' })
  riskClass!: number;

  @IsNumber()
  @Min(0)
  @Expose({ name: 'employee_count' })
  employeeCount!: number;

  @IsString()
  city!: string;

  @IsString()
  department!: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'arl_name' })
  arlName!: string | null;

  @IsBoolean()
  @IsOptional()
  @Expose({ name: 'is_active' })
  isActive!: boolean;
}
