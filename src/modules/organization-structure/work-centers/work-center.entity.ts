import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from '../companies/companies.entity';
import { WorkArea } from '../work-areas/work-area.entity';
import { Position } from '../positions/position.entity';
import { Employee } from '../employees/employee.entity';

@Entity('work_centers')
export class WorkCenter extends BaseEntity {
  @Column({ name: 'company_id' })
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
  employeeCount!: number;

  @Column({ name: 'is_main', default: false })
  isMain!: boolean;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;

  @ManyToOne(() => Company, (company) => company.workCenters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @OneToMany(() => WorkArea, (workArea) => workArea.workCenter)
  workAreas!: WorkArea[];

  @OneToMany(() => Position, (position) => position.workCenter)
  positions!: Position[];

  @OneToMany(() => Employee, (employee) => employee.workCenter)
  employees!: Employee[];
}
