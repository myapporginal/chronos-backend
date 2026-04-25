import { CreateOrUpdateUserDto } from '@modules/access-control/users/dtos/create-or-update.dto';
import { CreateOrUpdateCompanyDto } from '@modules/organization-structure/companies/dtos/create-or-update.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class RegisterDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrUpdateCompanyDto)
  company!: CreateOrUpdateCompanyDto;

  @ValidateNested({ each: true })
  @Type(() => CreateOrUpdateUserDto)
  user!: CreateOrUpdateUserDto;
}
