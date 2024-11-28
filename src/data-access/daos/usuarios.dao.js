import Usuario from '../models/usuario.model.js';
import BasicDAO from './basic.dao.js';

class UsuariosDAO extends BasicDAO {
  constructor() {
    super(Usuario);
  }

  async findByEmail(email) {
    return await this.findOne({ where: { email: email.toLowerCase() } });
  }
}

export default new UsuariosDAO();
