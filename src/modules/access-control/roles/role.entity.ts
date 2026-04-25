import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RolePermission } from '../role-permissions/role-permission.entity';
import { User } from '../users/user.entity';
import { Company } from '@modules/organization-structure/companies/companies.entity';

export const RoleEnum = {
  SUPER_ADMIN: '0b09d0db-faac-4e6b-96f1-bcf702b136dc',
  ADMIN: '55c2cd14-fa96-464b-a2c9-d2e193cda5cc',
  USER: '4ed0b348-f6f5-433f-8ef9-63dd3b818958',
} as const;

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ name: 'company_id', nullable: true, type: 'uuid' })
  companyId!: string | null;

  @Column({ unique: true, length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions!: RolePermission[];

  @ManyToOne(() => Company, (company) => company.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
