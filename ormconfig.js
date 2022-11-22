const dotenv = require('dotenv');

dotenv.config();
const TypeOrmConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  type: process.env.TYPEORM_TYPE,
  synchronize: false,
  logging: false,
  entities: ['src/entities/**/*{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
};

module.exports = TypeOrmConfig;
