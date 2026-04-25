import { CreateOrUpdateUserDto } from '@modules/access-control/users/dtos/create-or-update.dto';
import { CreateOrUpdateCompanyDto } from '@modules/organization-structure/companies/dtos/create-or-update.dto';
import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';

export class RegisterDto {
  @IsObject()
  @Type(() => CreateOrUpdateCompanyDto)
  company!: CreateOrUpdateCompanyDto;

  @IsObject()
  @Type(() => CreateOrUpdateUserDto)
  user!: CreateOrUpdateUserDto;
}
