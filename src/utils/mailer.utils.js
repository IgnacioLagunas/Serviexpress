import { transporter } from '../config/nodemailer.config.js';
import { logger } from './logger.utils.js';

export const sendRecoveryEmail = async ({ _id: userID, email }, token) => {
  const mailOptions = {
    from: 'ign.lagunas',
    to: email,
    subject: 'Recuperación de contraseña',
    html: `<h2>Recupera tu contraseña entrando a este link: </h2> <a href="http://localhost:8080/api/password/change/${userID}/${token}">Recovery link</a>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
  }
};

export const sendAccountDeletionEmail = async (user) => {
  const { first_name, last_name, email } = user;
  const mailOptions = {
    from: 'ign.lagunas',
    to: email,
    subject: 'Account deleted',
    html: `<h2>Dear ${first_name} ${last_name},</h2> <p>Your account has been deleted due to inactivity. </p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.warn('Email enviado a ' + email);
    return;
  } catch (error) {
    logger.error(error);
  }
};

export const sendProductDeletionEmail = async (user, product) => {
  const { first_name, last_name, email } = user;
  const mailOptions = {
    from: 'ign.lagunas',
    to: email,
    subject: 'Account deleted',
    html: `<h2>Dear ${first_name} ${last_name},</h2> <p>Your product ${product.title} has been deleted. </p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.warn('Email enviado a ' + email);
    return;
  } catch (error) {
    logger.error(error);
  }
};
