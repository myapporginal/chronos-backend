import { DataSource } from 'typeorm';
import { HazardFamily } from '@modules/risk-management/hazard-families/hazard-family.entity';
import { Seeder } from 'typeorm-extension';
import { randomUUID } from 'crypto';

export class DefaultsHazardsFamilies1777139688496 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    const hazardFamilies: Partial<HazardFamily>[] = [
      {
        code: 'biological',
        name: 'Biológico',
        description: 'Peligros relacionados con organismos vivos',
      },
      {
        code: 'physical',
        name: 'Físico',
        description: 'Peligros relacionados con fuerzas físicas',
      },
      {
        code: 'chemical',
        name: 'Químico',
        description: 'Peligros relacionados con productos químicos',
      },
      {
        code: 'psychosocial',
        name: 'Psicosocial',
        description: 'Peligros relacionados con factores psicosociales',
      },
      {
        code: 'biomechanical',
        name: 'Biomecánico',
        description: 'Peligros relacionados con la biomecánica',
      },
      {
        code: 'security_conditions',
        name: 'Condiciones de seguridad',
        description: 'Peligros relacionados con las condiciones de seguridad',
      },
      {
        code: 'natural_phenomena',
        name: 'Fenómenos naturales',
        description: 'Peligros relacionados con fenómenos naturales',
      },
    ];

    for (const hazardFamily of hazardFamilies) {
      hazardFamily.id = randomUUID();
      const repository = dataSource.getRepository(HazardFamily);
      const existing = await repository.findOne({
        where: { code: hazardFamily.code },
      });
      if (!existing) {
        await repository.save(hazardFamily);
      }
    }
  }
}
