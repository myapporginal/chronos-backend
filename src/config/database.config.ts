import { ConfigService } from '@common/utils/services/config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

type Options = DataSourceOptions | TypeOrmModuleOptions;

export class DatabaseConfigService extends ConfigService {
  constructor(env: Record<string, string | undefined>) {
    super(env);
  }

  isProduction(): boolean {
    return this.get<string>('NODE_ENV') === 'production';
  }

  getTypeOrmConfig(): Options {
    const isProd = this.isProduction();

    return {
      type: 'postgres',
      host: this.get<string>('DB_HOST'),
      port: Number(this.get<string>('DB_PORT')),
      username: this.get<string>('DB_USER'),
      password: this.get<string>('DB_PASSWORD'),
      database: this.get<string>('DB_NAME'),

      entities: [isProd ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],

      migrations: [isProd ? 'dist/migrations/*.js' : 'migrations/*.ts'],

      synchronize: !isProd,
      migrationsRun: !isProd,
      logging: !isProd,
    };
  }
}
