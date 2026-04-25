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
      {
        id: 'e8aa3a46-3726-4ca2-8d54-e51a2c0f0ecd',
        roleId: roleSuperAdmin,
        permissionId: '260c1274-b925-400c-ba5c-32cd5db19771',
      },
      {
        id: 'd942f446-a37d-4896-8d47-5870a8f818e6',
        roleId: roleSuperAdmin,
        permissionId: 'e6c8f5d1-2c4e-4b0a-9f3d-1e7c6b8d4a5f',
      },
      {
        id: '5b0f372a-16dc-49cd-a937-b5670a823e04',
        roleId: roleSuperAdmin,
        permissionId: 'f63f8158-4a7d-46ed-9bb0-9dbe70a80e99',
      },
      {
        id: 'ab446f26-5a0a-4b72-b5d7-9235a663e505',
        roleId: roleSuperAdmin,
        permissionId: 'ef60a4c8-3dd8-4c55-ab8e-f2260ecacc65',
      },
      {
        id: '8be1c9e8-5564-4b9a-852f-3a40a6cd466c',
        roleId: roleSuperAdmin,
        permissionId: 'a096c1b2-0247-49d0-b294-3cfc1a224e9d',
      },
      {
        id: '8be1c9e8-5564-4b9a-852f-3a40a6cd466d',
        roleId: roleSuperAdmin,
        permissionId: 'c5ed8297-992e-4c17-9d8f-530aa29e40b4',
      },
      {
        id: '34faa2c3-079e-47ac-8cfb-db0e8aa086b2',
        roleId: roleSuperAdmin,
        permissionId: '05d7d0d5-54de-4f40-82b5-a7d79e9c0286',
      },
      {
        id: 'd9087992-4ac3-49ba-a33b-b97a82919d9b',
        roleId: roleSuperAdmin,
        permissionId: '12f049b6-e2f0-467d-a328-f4605d4aa7b4',
      },
      {
        id: '9ca2547b-3d84-415d-b24b-970aa4c82e7c',
        roleId: roleSuperAdmin,
        permissionId: '1f313c44-2c98-4f06-997e-e5b76d2248f8',
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
