import { UserResponseWithCart } from '../data-access/dtos/userDTOs.js';

class SessionsService {
  getCurrentSession = (req) => {
    console.log(req.user);
    return UserResponseWithCart(req.user);
  };
}

export default new SessionsService();
