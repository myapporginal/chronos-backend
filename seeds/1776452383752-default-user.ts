import { User } from '@modules/access-control/users/user.entity';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class DefaultUser1776452383752 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<void> {
    const defaultUser = new User();
    defaultUser.id = '160c6f3d-d396-45e4-b62c-f97efc6d7953';
    defaultUser.email = 'admin@admin.com';
    defaultUser.password = await bcrypt.hash('123456789', 10);
    defaultUser.firstName = 'Default';
    defaultUser.lastName = 'User';
    defaultUser.roleId = '4ed0b348-f6f5-433f-8ef9-63dd3b818958';
    defaultUser.isActive = true;
    defaultUser.lastLoginAt = new Date().toISOString();

    const repository = dataSource.getRepository(User);

    // Avoid duplicate entry
    const existing = await repository.findOne({
      where: { email: defaultUser.email },
    });
    if (!existing) {
      await repository.save(defaultUser);
    }
  }
}
