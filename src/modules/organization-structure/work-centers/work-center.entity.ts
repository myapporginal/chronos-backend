import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkArea } from '../work-areas/work-area.entity';
import { Position } from '../positions/position.entity';
import { Expose } from 'class-transformer';
import { Company } from '../companies/companies.entity';

@Entity('work_centers')
export class WorkCenter extends BaseEntity {
  @Column({ name: 'company_id', type: 'uuid' })
  @Expose({ name: 'company_id' })
  companyId!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ length: 300, nullable: true })
  address!: string;

  @Column({ length: 100, nullable: true })
  city!: string;

  @Column({ length: 100, nullable: true })
  department!: string;

  @Column({ name: 'employee_count', type: 'int', default: 0 })
  @Expose({ name: 'employee_count' })
  employeeCount!: number;

  @Column({ name: 'is_main', default: false })
  @Expose({ name: 'is_main' })
  isMain!: boolean;

  @Column({ default: true, name: 'is_active' })
  @Expose({ name: 'is_active' })
  isActive!: boolean;

  @OneToMany(() => WorkArea, (workArea) => workArea.workCenter)
  @Expose({ name: 'work_areas' })
  workAreas!: WorkArea[];

  @OneToMany(() => Position, (position) => position.workCenter)
  positions!: Position[];

  @ManyToOne(() => Company, (company) => company.workCenters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  // @OneToMany(() => Employee, (employee) => employee.workCenter)
  // employees!: Employee[];
}
