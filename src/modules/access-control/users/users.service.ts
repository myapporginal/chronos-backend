import { Injectable } from '@nestjs/common';
import { User } from '@modules/access-control/users/user.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@common/utils/services/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends BaseCrudService<User> {
  constructor(@InjectRepository(User) readonly repository: Repository<User>) {
    super(repository);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }
}
