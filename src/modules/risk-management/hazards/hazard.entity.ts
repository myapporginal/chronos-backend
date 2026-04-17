import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { HazardFamily } from '../hazard-families/hazard-family.entity';
import { Company } from '@modules/organization-structure/companies/companies.entity';
import { RiskAssessment } from '../risk-assesment/risk-assessment.entity';

@Entity('hazards')
export class Hazard extends BaseEntity {
  @Column({ name: 'hazard_family_id' })
  hazardFamilyId!: string;

  @Column({ name: 'company_id', nullable: true })
  companyId!: string | null;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  // Effects on health or security
  @Column({ name: 'possible_effects', type: 'text', nullable: true })
  possibleEffects!: string | null;

  // Relationships
  @ManyToOne(() => HazardFamily, (hazardFamily) => hazardFamily.hazards, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'hazard_family_id' })
  hazardFamily!: HazardFamily;

  // @ManyToOne(() => Company, (company) => company.hazards, {
  //   onDelete: 'CASCADE',
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'company_id' })
  // company!: Company | null;

  @OneToMany(() => RiskAssessment, (ra) => ra.hazard)
  riskAssessments!: RiskAssessment[];
}
