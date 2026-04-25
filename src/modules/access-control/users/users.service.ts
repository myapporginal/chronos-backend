import { Injectable } from '@nestjs/common';
import { User } from '@modules/access-control/users/user.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@common/utils/services/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@common/exceptions/unauthorized.exception';

@Injectable()
export class UsersService extends BaseCrudService<User> {
  constructor(@InjectRepository(User) readonly repository: Repository<User>) {
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
}
