import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Hazard } from '../hazards/hazard.entity';

@Entity('hazard_families')
export class HazardFamily extends BaseEntity {
  // Code of clasification by GTC-45
  @Column({ name: 'code', length: 10 })
  code!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  // Relationships
  @OneToMany(() => Hazard, (hazard) => hazard.hazardFamily)
  hazards!: Hazard[];
}
