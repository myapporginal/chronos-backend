import { DataSource } from 'typeorm';
import { HazardFamily } from '@modules/risk-management/hazard-families/hazard-family.entity';
import { Seeder } from 'typeorm-extension';

export class DefaultsHazardsFamilies1777139688496 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<void> {
    const hazardFamilies: Partial<HazardFamily>[] = [
      {
        id: '18fb82ed-569f-4ed0-8bbb-1c84b6756ff3',
        code: 'biological',
        name: 'Biológico',
        description: 'Peligros relacionados con organismos vivos',
      },
      {
        id: '4b7b99ff-56ef-478c-8222-79b9837b9f75',
        code: 'physical',
        name: 'Físico',
        description: 'Peligros relacionados con fuerzas físicas',
      },
      {
        id: 'fecf2aea-6ee9-49f5-bdf2-06d7797b95ae',
        code: 'chemical',
        name: 'Químico',
        description: 'Peligros relacionados con productos químicos',
      },
      {
        id: '04af1e34-9772-4b11-9485-a857551266fd',
        code: 'psychosocial',
        name: 'Psicosocial',
        description: 'Peligros relacionados con factores psicosociales',
      },
      {
        id: 'ce025b5c-1e34-4bee-9353-dda96305b3f5',
        code: 'biomechanical',
        name: 'Biomecánico',
        description: 'Peligros relacionados con la biomecánica',
      },
      {
        id: '3459db9f-c845-4c23-9930-14765b109992',
        code: 'security_conditions',
        name: 'Condiciones de seguridad',
        description: 'Peligros relacionados con las condiciones de seguridad',
      },
      {
        id: '26ef738e-09db-43f1-9402-b096e6ccc372',
        code: 'natural_phenomena',
        name: 'Fenómenos naturales',
        description: 'Peligros relacionados con fenómenos naturales',
      },
    ];

    for (const hazardFamily of hazardFamilies) {
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
