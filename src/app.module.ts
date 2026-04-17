import * as common from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigModule } from './config/config.module';
import { DatabaseConfigService } from './config/database.config';
import { OrganizationStructureModule } from '@modules/organization-structure/organization-structure.module';
import { IsUniqueConstraint } from '@common/decorators/is-unique.decorator';

@common.Module({
  imports: [
    CustomConfigModule,

    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (dbConfig: DatabaseConfigService) => {
        console.log(dbConfig.getTypeOrmConfig());
        return dbConfig.getTypeOrmConfig();
      },
    }),

    // Modules
    OrganizationStructureModule,
  ],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
