import { Role } from '@modules/access-control/roles/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class DefaultsRoles1776451819557 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<void> {
    const roles: Partial<Role>[] = [
      {
        id: '0b09d0db-faac-4e6b-96f1-bcf702b136dc',
        name: 'Super Admin',
        description: 'Administrador de todo el sistema',
        isActive: true,
      },
      {
        id: '4ed0b348-f6f5-433f-8ef9-63dd3b818958',
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
