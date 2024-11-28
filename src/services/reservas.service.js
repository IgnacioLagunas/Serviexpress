import ReservasDAO from '../data-access/daos/reservas.dao.js';
import { EntitiyNotFoundError } from '../errors/errors.js';
import { logger } from '../utils/logger.utils.js';

class ReservasService {
  constructor(ReservasDAO) {
    this.reservasDao = ReservasDAO;
  }
  async getAll() {
    const usuarios = await this.reservasDao.getAll();
    return usuarios.map((user) => user.get());
  }

  async createOne(usuario) {
    const usuarioExiste = await this.findOneByEmail(usuario.email);
    if (usuarioExiste) throw new UserAlreadyExistsError(usuario.email);
    const nuevoUsuario = new UserDB({ ...usuario });
    const usuarioCreado = await this.reservasDao.createOne(nuevoUsuario);
    logger.http('Nuevo usuario: ', usuarioCreado.get());
    return usuarioCreado.get();
  }

  async updateOne(id, update) {
    const usuario = await this.reservasDao.findOneById(id);
    if (!usuario) throw new EntitiyNotFoundError('Usuario');
    const nuevoUsuario = await this.reservasDao.updateOne(id, update);
    logger.http('Usuario actualizado: ', nuevoUsuario.get());
    return nuevoUsuario.get();
  }

  async deleteOne(id) {
    const user = await this.reservasDao.findOneById(id);
    if (!user) throw new EntitiyNotFoundError('Usuario');
    const ans = await this.reservasDao.deleteOne(id);
    if (ans == 0) throw new Error(`Error al eliminar usuario`);
    logger.info('Usuario eliminado: ', user.get());
    return user.get(); // 1
  }

  async findOneByEmail(email) {
    const usuario = await this.reservasDao.findByEmail(email.toLowerCase());
    if (!usuario) return null;
    return usuario.get();
  }
}
export default ReservasService = new ReservasService(UsuariosDao);
