import dotenv from 'dotenv';

dotenv.config();

export default {
  ENVIROMENT: process.env.NODE_ENV || 'development',

  DB_URI: process.env.DB_URI,
  DB_SECRET: process.env.DB_SECRET,

  PORT: process.env.PORT,
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  JWT_SECRET: process.env.JWT_SECRET,

  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
};
