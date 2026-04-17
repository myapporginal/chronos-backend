import { BaseEntity } from '@common/utils/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RolePermission } from '../role-permissions/role-permission.entity';

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

  // @OneToMany(() => User, (user) => user.role)
  // users!: User[];
}
