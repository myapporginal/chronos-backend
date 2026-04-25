import { Role, RoleEnum } from '@modules/access-control/roles/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class DefaultsRoles1776451819557 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<void> {
    const roles: Partial<Role>[] = [
      {
        id: RoleEnum.SUPER_ADMIN,
        name: 'Super Admin',
        description: 'Administrador de todo el sistema',
        isActive: true,
      },
      {
        id: RoleEnum.ADMIN,
        name: 'Admin',
        description: 'Administrador de la empresa',
        isActive: true,
      },
      {
        id: RoleEnum.USER,
        name: 'User',
        description: 'Usuario del sistema',
        isActive: true,
      },
    ];

    for (const role of roles) {
      const repository = dataSource.getRepository(Role);
      const existing = await repository.findOne({ where: { name: role.name } });
      if (!existing) {
        await repository.save(role);
      }
    }
  }
}
