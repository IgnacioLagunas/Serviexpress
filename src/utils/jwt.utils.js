import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { UserJWT } from '../data-access/dtos/userDTOs.js';
import { Error } from 'mongoose';

export const generateNewToken = (
  user,
  expiresIn = '1h',
  secret = config.JWT_SECRET
) => {
  return jwt.sign(UserJWT(user), secret, { expiresIn });
};

export const verifyToken = (token, secret = config.JWT_SECRET) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      throw new Error('Could not verify token');
    } else {
      return decoded;
    }
  });
};
