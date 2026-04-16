import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigModule } from './config/config.module';
import { DatabaseConfigService } from './config/database.config';

@Module({
  imports: [
    // 1. Importas tu módulo de configuración a nivel de AppModule
    CustomConfigModule,

    TypeOrmModule.forRootAsync({
      // 2. IMPORTANTE: También debes importar el módulo AQUÍ adentro
      imports: [CustomConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (dbConfig: DatabaseConfigService) => {
        console.log(dbConfig.getTypeOrmConfig());
        return dbConfig.getTypeOrmConfig();
      },
    }),
  ],
})
export class AppModule {}
