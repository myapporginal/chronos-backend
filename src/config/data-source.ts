import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfigService } from './database.config';
import { SeederOptions } from 'typeorm-extension';

const config = new DatabaseConfigService();

const configs = {
  ...config.getTypeOrmConfig(),
  seeds: ['seeds/*.ts'],
};

export const AppDataSource = new DataSource(
  configs as DataSourceOptions & SeederOptions,
);
