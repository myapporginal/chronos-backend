import { ConfigService } from '@common/utils/services/config.service';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

type Options = DataSourceOptions | TypeOrmModuleOptions;

@Injectable()
export class DatabaseConfigService extends ConfigService {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    super(process.env as Record<string, string | undefined>);
  }

  isProduction(): boolean {
    return this.get<string>('NODE_ENV') === 'production';
  }

  isCli(): boolean {
    return this.get<string>('NODE_ENV') === 'cli';
  }

  getTypeOrmConfig(): Options {
    const isCli = this.isCli();

    return {
      type: 'postgres',
      host: this.get<string>('DB_HOST'),
      port: Number(this.get<string>('DB_PORT')),
      username: this.get<string>('DB_USER'),
      password: this.get<string>('DB_PASSWORD'),
      database: this.get<string>('DB_NAME'),

      autoLoadEntities: true,

      entities: [isCli ? 'src/**/*.entity.js' : ''],

      migrations: [isCli ? 'migrations/*.ts' : 'dist/migrations/*.ts'],

      logging: true,
    };
  }
}
