import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { DefaultCompany1776450806283 } from './1776450806283-default-company';
import { DefaultsRoles1776451819557 } from './1776451819557-defaults-roles';
import { DefaultsPermissions1776550801422 } from './1776550801422-defaults-permissions';
import { DefaultsRolesPermissions1776551143080 } from './1776551143080-defaults-roles-permissions';
import { DefaultsHazardsFamilies1777139688496 } from './1777139688496-defaults-hazards-families';
import { DefaultsHazards1777231774014 } from './1777231774014-defaults-hazards';
import { DefaultUser1776452383752 } from './1776452383752-default-user';

export class GeneralSeeds1777234905408 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    const seeds = [
      new DefaultCompany1776450806283(),
      new DefaultsRoles1776451819557(),
      new DefaultsPermissions1776550801422(),
      new DefaultsRolesPermissions1776551143080(),
      new DefaultsHazardsFamilies1777139688496(),
      new DefaultsHazards1777231774014(),
      new DefaultUser1776452383752(),
    ];

    for (const seed of seeds) {
      console.log(`Ejecutando seed: ${seed.constructor.name}`);
      await seed.run(dataSource);
    }
  }
}
