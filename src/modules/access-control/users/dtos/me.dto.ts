import { Expose, Type } from 'class-transformer';

export class PermissionDto {
  @Expose()
  name!: string;
}

export class RoleDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;
}

export class MeDto {
  @Expose()
  id!: string;

  @Expose({ name: 'company_id' })
  companyId!: string;

  @Expose()
  email!: string;

  @Expose({ name: 'first_name' })
  firstName!: string;

  @Expose({ name: 'last_name' })
  lastName!: string;

  @Expose()
  @Type(() => RoleDto)
  role!: RoleDto;

  @Expose()
  scopes!: string[];
}
