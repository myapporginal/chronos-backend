import { Permission } from '@modules/access-control/permissions/permission.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class DefaultsPermissions1776550801422 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<void> {
    const permissions: Partial<Permission>[] = [
      {
        id: 'a6675003-70bf-43d1-892e-f6862c60afcc',
        name: 'show:users',
        description: 'Ver usuarios',
      },
      {
        id: '4ed0b348-f6f5-433f-8ef9-63dd3b818958',
        name: 'save:users',
        description: 'Guardar usuarios',
      },

      {
        id: 'f2e45e7b-0d41-47d2-8d5e-c9b1a072002e',
        name: 'show:companies',
        description: 'Ver empresas',
      },
      {
        id: 'c04f6a21-8b3b-497e-8462-706b8707d02f',
        name: 'save:companies',
        description: 'Guardar empresas',
      },
      {
        id: '260c1274-b925-400c-ba5c-32cd5db19771',
        name: 'save:positions:own-company',
        description: 'Guardar cargos de la empresa',
      },
      {
        id: 'e6c8f5d1-2c4e-4b0a-9f3d-1e7c6b8d4a5f',
        name: 'view:positions:own-company',
        description: 'Ver cargos de la empresa',
      },
      {
        id: 'f63f8158-4a7d-46ed-9bb0-9dbe70a80e99',
        name: 'view:work-centers:own-company',
        description: 'Ver centros de trabajo de la empresa',
      },
      {
        id: 'ef60a4c8-3dd8-4c55-ab8e-f2260ecacc65',
        name: 'save:work-centers:own-company',
        description: 'Guardar centros de trabajo de la empresa',
      },
      {
        id: 'a096c1b2-0247-49d0-b294-3cfc1a224e9d',
        name: 'save:employees:own-company',
        description: 'Guardar empleados de la empresa',
      },
      {
        id: 'c5ed8297-992e-4c17-9d8f-530aa29e40b4',
        name: 'view:employees:own-company',
        description: 'Ver empleados de la empresa',
      },
    ];

    for (const permission of permissions) {
      const repository = dataSource.getRepository(Permission);
      const existing = await repository.findOne({
        where: { id: permission.id },
      });
      if (!existing) {
        await repository.save(permission);
      }
    }
  }
}
