import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  DatabaseURL: process.env.DatabaseURL,
  bycrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  NOTIFICATION_SERVICE_API_KEY: process.env.NOTIFICATION_SERVICE_API_KEY,
  USER_SERVICE_API_KEY: process.env.USER_SERVICE_API_KEY,
  POST_SERVICE_API_KEY: process.env.POST_SERVICE_API_KEY,
};
