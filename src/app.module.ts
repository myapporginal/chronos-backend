import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigModule } from './config/config.module';
import { DatabaseConfigService } from './config/database.config';
import { OrganizationStructureModule } from '@modules/organization-structure/organization-structure.module';
import { IsUniqueConstraint } from '@common/decorators/is-unique.decorator';

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
  ],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
