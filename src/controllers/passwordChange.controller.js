import config from '../config/config.js';
import { EntitiyNotFoundError, MissingDataError } from '../errors/errors.js';
import { SamePasswordAsBeforeError } from '../errors/user.errors.js';
import usersService from '../services/users.service.js';
import { createHash, isPasswordValid } from '../utils/password.utils.js';
import { generateNewToken } from '../utils/jwt.utils.js';
import { sendRecoveryEmail } from '../utils/mailer.utils.js';

class PasswordChangeController {
  sendRecoveryEmail = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        throw new MissingDataError();
      }
      const user = await usersService.findOneByEmail(email);
      if (!user) {
        throw new EntitiyNotFoundError('User');
      }
      // Crear token
      const secret = config.JWT_SECRET + user.password || '';
      const token = generateNewToken({ email: user.email }, '1h', secret);
      // enviar email
      await sendRecoveryEmail(user, token);
      res
        .status(200)
        .json({ message: 'Email sent successfully please check your inbox' });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  changePassword = async (req, res) => {
    try {
      const user = await usersService.findOneByEmail(req.user.email);
      if (!user) {
        throw new EntitiyNotFoundError('User');
      }
      // If true the password is the same as the old one
      const isSamePassword = isPasswordValid(user, req.body.password);
      if (isSamePassword) {
        throw new SamePasswordAsBeforeError();
      }
      const hashedPassword = createHash(req.body.password);
      usersService.updateOne(user.id, { password: hashedPassword });
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };
}

export default new PasswordChangeController();
