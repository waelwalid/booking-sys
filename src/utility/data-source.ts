import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from 'config';

const ormConfig = require('../../ormconfig');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postgresConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('postgresConfig');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mysqlConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('mysqlConfig');

export const AppDataSource = new DataSource(ormConfig);
