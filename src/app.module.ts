import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigModule } from './config/config.module';
import { DatabaseConfigService } from './config/database.config';
import { OrganizationStructureModule } from '@modules/organization-structure/organization-structure.module';
import { IsUniqueConstraint } from '@common/decorators/is-unique.decorator';
import { AuthModule } from './modules/auth/auth.module';
import { AccessControlModule } from './modules/access-control/access-control.module';

@Module({
  imports: [
    CustomConfigModule,

    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (dbConfig: DatabaseConfigService) =>
        dbConfig.getTypeOrmConfig(),
    }),

    // Feature modules
    OrganizationStructureModule,
    AuthModule,
    AccessControlModule,
  ],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
