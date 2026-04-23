import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';
import { WorkCenter } from '../work-centers/work-center.entity';

@Entity('work_areas')
export class WorkArea extends BaseEntity {
  @Column({ name: 'work_center_id' })
  @Expose({ name: 'work_center_id' })
  workCenterId!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ nullable: true, type: 'text' })
  description!: string | null;

  @ManyToOne(() => WorkCenter, (workCenter) => workCenter.workAreas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work_center_id' })
  @Expose({ name: 'work_center' })
  workCenter!: WorkCenter;

  // @OneToMany(() => RiskAssessment, (ra) => ra.workArea)
  // riskAssessments!: RiskAssessment[];
}
