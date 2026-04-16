import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkCenter } from '../work-centers/work-center.entity';
import { Employee } from '../employees/employee.entity';
import { RiskAssessment } from '@modules/risk-management/risk-assesment/risk-assessment.entity';

@Entity('positions')
export class Position extends BaseEntity {
  @Column({ name: 'work_center_id ' })
  workCenterId!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'risk_level', type: 'smallint', nullable: true })
  riskLevel!: number | null;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @ManyToOne(() => WorkCenter, (workCenter) => workCenter.positions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work_center_id' })
  workCenter!: WorkCenter;

  @OneToMany(() => Employee, (employee) => employee.position)
  employees!: Employee[];

  @OneToMany(() => RiskAssessment, (ra) => ra.position)
  riskAssessments!: RiskAssessment[];
}
