class SessionsService {
  getCurrentSession = (req) => {
    return req.user;
  };
}

export default new SessionsService();
