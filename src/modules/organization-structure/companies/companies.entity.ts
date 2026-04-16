import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { WorkCenter } from '../work-centers/work-center.entity';
import { User } from '@modules/access-control/users/user.entity';
import { Hazard } from '@modules/risk-management/hazards/hazard.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column({ unique: true })
  nit!: string;

  @Column()
  name!: string;

  // Code CIIU of economic activity (Decreto 1607/2002)
  @Column({ name: 'economic_activity', length: 10 })
  economicActivity!: string;

  @Column({ name: 'risk_class', type: 'smallint' })
  riskClass!: number;

  @Column({ name: 'employee_count', type: 'int', default: 0 })
  employeeCount!: number;

  @Column({ length: 100 })
  city!: string;

  @Column({ length: 100 })
  department!: string;

  @Column({ type: 'varchar', name: 'arl_name', length: 100, nullable: true })
  arlName!: string | null;

  @Column({ default: true, name: 'is_active' })
  isActive!: boolean;

  // Relations
  @OneToMany(() => WorkCenter, (workCenter) => workCenter.company)
  workCenters!: WorkCenter[];

  @OneToMany(() => User, (user) => user.company)
  users!: User[];

  @OneToMany(() => Hazard, (hazard) => hazard.company)
  hazards!: Hazard[];
}
