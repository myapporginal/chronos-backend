import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ControlHierarchyLevel, ControlStatus } from '../common/utils/enums';
import { RiskAssessment } from '../risk-assessment/risk-assessment.entity';
import { User } from '@modules/access-control/users/user.entity';

@Entity('control_measures')
export class ControlMeasure extends BaseEntity {
  @Column({ name: 'risk_assessment_id' })
  riskAssessmentId!: string;

  @Column({ name: 'company_id' })
  companyId!: string;

  @Column({ name: 'responsible_id' })
  responsibleId!: string;

  @Column({
    name: 'hierarchy_level',
    type: 'enum',
    enum: ControlHierarchyLevel,
  })
  hierarchyLevel!: ControlHierarchyLevel;

  @Column({ type: 'text' })
  description!: string;

  @Column({ name: 'due_date', type: 'date' })
  dueDate!: string;

  @Column({ name: 'completion_date', type: 'date', nullable: true })
  completionDate!: string | null;

  @Column({
    type: 'enum',
    enum: ControlStatus,
    default: ControlStatus.PENDING,
  })
  status!: ControlStatus;

  // 1–5: effectiveness rating for audits
  @Column({ name: 'effectiveness_rating', type: 'smallint', nullable: true })
  effectivenessRating!: number | null;

  // Relaciones
  @ManyToOne(() => RiskAssessment, (ra) => ra.controlMeasures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'risk_assessment_id' })
  riskAssessment!: RiskAssessment;

  @ManyToOne(() => User, (u) => u.controlMeasures, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'responsible_id' })
  responsible!: User;
}
