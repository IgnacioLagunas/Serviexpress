import { createTransport } from 'nodemailer';
import config from './config.js';

export const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: config.NODEMAILER_USER,
    pass: config.NODEMAILER_PASSWORD,
  },
});
