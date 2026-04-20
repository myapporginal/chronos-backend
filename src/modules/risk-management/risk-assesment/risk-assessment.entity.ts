import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
  InterventionLevel,
  RiskAcceptability,
  RiskStatus,
} from '../common/utils/enums';
import { Company } from '@modules/organization-structure/companies/companies.entity';
import { WorkCenter } from '@modules/organization-structure/work-centers/work-center.entity';
import { Position } from '@modules/organization-structure/positions/position.entity';

@Entity('risk_assessments')
export class RiskAssessment extends BaseEntity {
  @Column({ name: 'company_id' })
  companyId!: string;

  @Column({ name: 'work_center_id' })
  workCenterId!: string;

  @Column({ name: 'work_area_id' })
  workAreaId!: string;

  @Column({ name: 'position_id' })
  positionId!: string;

  @Column({ name: 'hazard_id' })
  hazardId!: string;

  @Column({ name: 'responsible_id' })
  responsibleId!: string;

  // Productive process where the hazard is present
  @Column({ name: 'process_name', length: 200 })
  processName!: string;

  // Specific task or activity
  @Column({ length: 300 })
  activity!: string;

  // Routine vs non-routine (Decreto 1072)
  @Column({ name: 'is_routine', default: true })
  isRoutine!: boolean;

  @Column({ name: 'workers_exposed', type: 'int' })
  workersExposed!: number;

  // Existing controls before the assessment
  @Column({ name: 'existing_controls', type: 'text', nullable: true })
  existingControls!: string | null;

  // ── GTC-45 Variables ────────────────────────────────────
  @Column({ type: 'smallint' })
  nd!: number; // Nivel de deficiencia (1, 2, 6, 10)

  @Column({ type: 'smallint' })
  ne!: number; // Nivel de exposición (1, 2, 3, 4)

  @Column({ type: 'smallint' })
  np!: number; // Nivel de probabilidad = nd × ne (calculado)

  @Column({ type: 'smallint' })
  nc!: number; // Nivel de consecuencia (10, 25, 60, 100)

  @Column({ type: 'int' })
  nr!: number; // Nivel de riesgo = np × nc (calculado)

  @Column({
    name: 'intervention_level',
    type: 'enum',
    enum: InterventionLevel,
  })
  interventionLevel!: InterventionLevel;

  @Column({
    type: 'enum',
    enum: RiskAcceptability,
  })
  acceptability!: RiskAcceptability;

  @Column({
    type: 'enum',
    enum: RiskStatus,
    default: RiskStatus.IDENTIFIED,
  })
  status!: RiskStatus;

  @Column({ name: 'last_review_date', type: 'date', nullable: true })
  lastReviewDate!: string | null;

  // Frecuencia mínima de revisión según Resolución 0312
  @Column({ name: 'next_review_date', type: 'date', nullable: true })
  nextReviewDate!: string | null;

  // Relaciones
  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @ManyToOne(() => WorkCenter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'work_center_id' })
  workCenter!: WorkCenter;

  // @ManyToOne(() => WorkArea, (wa) => wa.riskAssessments, {
  //   onDelete: 'RESTRICT',
  // })
  // @JoinColumn({ name: 'work_area_id' })
  // workArea!: WorkArea;

  @ManyToOne(() => Position, (p) => p.riskAssessments, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'position_id' })
  position!: Position;

  // @ManyToOne(() => Hazard, (h) => h.riskAssessments, { onDelete: 'RESTRICT' })
  // @JoinColumn({ name: 'hazard_id' })
  // hazard!: Hazard;

  // @ManyToOne(() => User, (u) => u.riskAssessments, { onDelete: 'RESTRICT' })
  // @JoinColumn({ name: 'responsible_id' })
  // responsible!: User;

  // @OneToMany(() => ControlMeasure, (cm) => cm.riskAssessment)
  // controlMeasures!: ControlMeasure[];
}
