import { RolePermission } from '@modules/access-control/role-permissions/role-permission.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class DefaultsRolesPermissions1776551143080 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<void> {
    const roleSuperAdmin = '0b09d0db-faac-4e6b-96f1-bcf702b136dc';

    const permissions: Partial<RolePermission>[] = [
      {
        id: '020d88b9-5d26-40b5-b57a-0ff8176a72a4',
        roleId: roleSuperAdmin,
        permissionId: 'a6675003-70bf-43d1-892e-f6862c60afcc',
      },
      {
        id: 'a0650732-2601-469a-abd5-8e2011c0b572',
        roleId: roleSuperAdmin,
        permissionId: '4ed0b348-f6f5-433f-8ef9-63dd3b818958',
      },
      {
        id: '434a880a-b211-42f6-837b-c908f641ff34',
        roleId: roleSuperAdmin,
        permissionId: 'f2e45e7b-0d41-47d2-8d5e-c9b1a072002e',
      },
      {
        id: '08d47183-f6c9-48df-aa9e-80012111fc04',
        roleId: roleSuperAdmin,
        permissionId: 'c04f6a21-8b3b-497e-8462-706b8707d02f',
      },
    ];

    for (const permission of permissions) {
      const repository = dataSource.getRepository(RolePermission);
      const existing = await repository.findOne({
        where: { id: permission.id },
      });
      if (!existing) {
        await repository.save(permission);
      }
    }
  }
}
