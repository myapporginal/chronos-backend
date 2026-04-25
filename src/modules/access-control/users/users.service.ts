import { Injectable } from '@nestjs/common';
import { User } from '@modules/access-control/users/user.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@common/utils/services/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';
import { Company } from '@modules/organization-structure/companies/companies.entity';
import { NotFoundException } from '@common/exceptions/not-found.exception';
import { ConflictException } from '@common/exceptions/conflict.exception';

@Injectable()
export class UsersService extends BaseCrudService<User> {
  constructor(
    @InjectRepository(User) readonly repository: Repository<User>,
    @InjectRepository(Company) readonly companyRepository: Repository<Company>,
  ) {
    super(repository);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      relations: [
        'role',
        'role.rolePermissions',
        'role.rolePermissions.permission',
      ],
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        companyId: true,
        password: true,
        role: {
          id: true,
          name: true,
        },
      },
    });
    if (!user) throw new UnauthorizedException();
    console.log(user);
    return user;
  }

  async saveForTenant(user: User, tenantId: string): Promise<User> {
    const company = await this.companyRepository.findOne({
      where: { id: tenantId },
    });
    if (!company)
      throw new NotFoundException([
        {
          field: 'company_id',
          message: 'La compañía no ha sido encontrada.',
        },
      ]);

    const userFound = await this.repository.findOne({
      where: { email: user.email },
    });
    if (userFound)
      throw new ConflictException(undefined, [
        {
          field: 'email',
          message: 'El correo electrónico ya existe.',
        },
      ]);

    const newUser = this.repository.create({
      ...user,
      company,
    });
    return this.repository.save(newUser);
  }
}
