import { ConfigService } from '@common/utils/services/config.service';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

type TypeOrmConfig = DataSourceOptions & TypeOrmModuleOptions;

/**
 * Database configuration service.
 * Uses required getters to fail fast when critical DB env vars are missing.
 */
@Injectable()
export class DatabaseConfigService extends ConfigService {
  constructor() {
    super(process.env as Record<string, string | undefined>);
  }

  isProduction(): boolean {
    return this.getString('NODE_ENV', 'development') === 'production';
  }

  /** True when TypeORM CLI is running outside of NestJS (e.g. migrations). */
  isCli(): boolean {
    return this.getString('NODE_ENV', 'development') === 'cli';
  }

  getTypeOrmConfig(): TypeOrmConfig {
    const isCli = this.isCli();

    return {
      type: 'postgres',
      host: this.getString('DB_HOST', '127.0.0.1'),
      port: this.getNumber('DB_PORT', 5432),
      username: this.getString('DB_USER'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_NAME'),

      autoLoadEntities: true,

      // CLI migration runs need to glob the source TS files directly.
      entities: [isCli ? 'src/**/*.entity.js' : ''],

      migrations: [isCli ? 'migrations/*.ts' : 'dist/migrations/*.ts'],

      logging: !this.isProduction(),
    };
  }
}
