import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '@modules/organization-structure/companies/companies.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'company_id', nullable: true, type: 'uuid' })
  companyId!: string | null;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ name: 'password', length: 255 })
  password!: string;

  @Column({ name: 'first_name', length: 100 })
  firstName!: string;

  @Column({ name: 'last_name', length: 100 })
  lastName!: string;

  @Column({ name: 'role_id' })
  roleId!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'last_login_at', nullable: true, type: 'timestamp' })
  lastLoginAt!: string | null;

  // Relations
  @ManyToOne(() => Company, (company) => company.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  // @ManyToOne(() => Role, (role) => role.users, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'role_id' })
  // role!: Role;

  // @OneToMany(() => Employee, (employee) => employee.user)
  // employees!: Employee[];

  // @OneToMany(() => RiskAssessment, (ra) => ra.responsible)
  // riskAssessments!: RiskAssessment[];

  // @OneToMany(() => ControlMeasure, (cm) => cm.responsible)
  // controlMeasures!: ControlMeasure[];
}
