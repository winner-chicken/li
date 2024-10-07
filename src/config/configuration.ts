import { registerAs } from '@nestjs/config';
export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGO_INITDB_HOST,
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    port: parseInt(process.env.MONGO_INITDB_PORT, 10),
    name: process.env.DATABASE_NAME,
  },
}));
