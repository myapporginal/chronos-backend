import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Company } from '@modules/organization-structure/companies/companies.entity';
import { Role } from '../roles/role.entity';
import { RolePermission } from '../role-permissions/role-permission.entity';
import { Permission } from '../permissions/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, Role, RolePermission, Permission]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
