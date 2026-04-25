import { DocumentType } from '@modules/access-control/common/utils/enums';
import { Column, JoinColumn, ManyToOne, Entity, OneToOne } from 'typeorm';
import { Position } from '../positions/position.entity';
import { BaseEntity } from '@common/utils/entities/base.entity';
import { WorkCenter } from '../work-centers/work-center.entity';
import { Expose } from 'class-transformer';
import { User } from '@modules/access-control/users/user.entity';

@Entity('employees')
export class Employee extends BaseEntity {
  @Column({ name: 'work_center_id', type: 'uuid' })
  @Expose({ name: 'work_center_id' })
  workCenterId!: string;

  @Column({ name: 'position_id', type: 'uuid', nullable: true })
  @Expose({ name: 'position_id' })
  positionId!: string | null;

  // Not all employees have a user account
  @Column({ name: 'user_id', nullable: true, type: 'uuid' })
  @Expose({ name: 'user_id' })
  userId!: string | null;

  @Column({ name: 'first_name', length: 100 })
  @Expose({ name: 'first_name' })
  firstName!: string;

  @Expose({ name: 'last_name' })
  @Column({ name: 'last_name', length: 100 })
  lastName!: string;

  @Column({ name: 'document_type', type: 'enum', enum: DocumentType })
  @Expose({ name: 'document_type' })
  documentType!: string;

  @Column({ name: 'document_number', length: 20 })
  @Expose({ name: 'document_number' })
  documentNumber!: string;

  @Column({ name: 'entry_date', type: 'date' })
  @Expose({ name: 'entry_date' })
  entryDate!: string;

  @Column({ name: 'exit_date', type: 'date', nullable: true })
  @Expose({ name: 'exit_date' })
  exitDate!: string | null;

  @Column({ name: 'is_active', default: true })
  @Expose({ name: 'is_active' })
  isActive!: boolean;

  // Relations
  @ManyToOne(() => WorkCenter, (workCenter) => workCenter.employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work_center_id' })
  @Expose({ name: 'work_center' })
  workCenter!: WorkCenter;

  @ManyToOne(() => Position, (position) => position.employees, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'position_id' })
  @Expose({ name: 'position' })
  position!: Position | null;

  @OneToOne(() => User, (user) => user.employee, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  @Expose({ name: 'user' })
  user!: User | null;
}
