import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfigService } from './database.config';

const config = new DatabaseConfigService();

export const AppDataSource = new DataSource(
  config.getTypeOrmConfig() as DataSourceOptions,
);
