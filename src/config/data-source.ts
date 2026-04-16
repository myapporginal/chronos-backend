import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfigService } from './database.config';

const config = new DatabaseConfigService(process.env);

console.log(config.getTypeOrmConfig());
export const AppDataSource = new DataSource(
  config.getTypeOrmConfig() as DataSourceOptions,
);
