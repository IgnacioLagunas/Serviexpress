import { UserResponse } from '../data-access/dtos/userDTOs.js';
import SessionsService from '../services/sessions.service.js';
import { generateNewToken } from '../utils/jwt.utils.js';
class SessionsController {
  getCurrent = (req, res) => {
    res.json({ user: SessionsService.getCurrentSession(req) });
  };
}

export default new SessionsController();
