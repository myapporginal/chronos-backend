import { DocumentType } from '@modules/access-control/common/utils/enums';
import { Column, JoinColumn, ManyToOne, Entity } from 'typeorm';
import { WorkCenter } from '../work-centers/work-center.entity';
import { Position } from '../positions/position.entity';
import { User } from '@modules/access-control/users/user.entity';
import { BaseEntity } from '@common/utils/entities/base.entity';

@Entity('employees')
export class Employee extends BaseEntity {
  @Column({ name: 'work_center_id', type: 'uuid' })
  workCenterId!: string;

  @Column({ name: 'position_id', type: 'uuid' })
  positionId!: string;

  // Not all employees have a user account
  @Column({ name: 'user_id', nullable: true, type: 'uuid' })
  userId!: string | null;

  @Column({ name: 'first_name', length: 100 })
  firstName!: string;

  @Column({ name: 'last_name', length: 100 })
  lastName!: string;

  @Column({ name: 'document_type', type: 'enum', enum: DocumentType })
  documentType!: string;

  @Column({ name: 'document_number', length: 20 })
  documentNumber!: string;

  @Column({ name: 'entry_date', type: 'date' })
  entryDate!: string;

  @Column({ name: 'exit_date', type: 'date', nullable: true })
  exitDate!: string | null;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  // Relations
  @ManyToOne(() => WorkCenter, (workCenter) => workCenter.employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work_center_id' })
  workCenter!: WorkCenter;

  @ManyToOne(() => Position, (position) => position.employees, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'position_id' })
  position!: Position;

  @ManyToOne(() => User, (user) => user.employees, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User | null;
}
