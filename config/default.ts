import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  postgresConfig: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },

  mysqlConfig: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },

  allowed_bus_count: process.env.ALLOWED_BUS_COUNT,
  allowed_location_count: process.env.ALLOWED_LOCATION_COUNT,
  allowed_seat_count: process.env.ALLOWED_SEAT_COUNT,
  allowed_seat_code: process.env.ALLOWED_SEAT_CODE,

  long_trip_distance: process.env.LONG_TRIP_DISTANCE,
};
