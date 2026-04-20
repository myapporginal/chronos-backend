import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { HazardFamily } from '../hazard-families/hazard-family.entity';

@Entity('hazards')
export class Hazard extends BaseEntity {
  @Column({ name: 'hazard_family_id' })
  hazardFamilyId!: string;

  /** Null means this hazard is a global/catalog entry not tied to a specific company */
  @Column({ name: 'company_id', nullable: true, type: 'uuid' })
  companyId!: string | null;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  /** Effects on health or security */
  @Column({ name: 'possible_effects', type: 'text', nullable: true })
  possibleEffects!: string | null;

  // ── Relationships ─────────────────────────────────────────────────────────

  @ManyToOne(() => HazardFamily, (hazardFamily) => hazardFamily.hazards, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'hazard_family_id' })
  hazardFamily!: HazardFamily;

  // @OneToMany(() => RiskAssessment, (ra) => ra.hazard)
  // riskAssessments!: RiskAssessment[];
}
