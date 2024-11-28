import UsuariosDao from '../data-access/daos/usuarios.dao.js';
import { UserDB } from '../data-access/dtos/userDTOs.js';
import {
  CannotChangeAdminRoleError,
  CannotTurnUserIntoAdminError,
  MissingRequiredDocumentsError,
  UserAlreadyThisRoleError,
  UserAlreadyExistsError,
} from '../errors/user.errors.js';
import { logger } from '../utils/logger.utils.js';
import { sendAccountDeletionEmail } from '../utils/mailer.utils.js';
import { returnMissingDocuments } from '../utils/users.utils.js';

class UsersService {
  constructor(UsuariosDao) {
    this.usuariosDao = UsuariosDao;
  }
  async getAll() {
    const usuarios = await this.usuariosDao.getAll();
    return usuarios.map((user) => user.get());
  }

  async createOne(usuario) {
    const usuarioExiste = await this.findOneByEmail(usuario.email);
    if (usuarioExiste) throw new UserAlreadyExistsError(usuario.email);
    const nuevoUsuario = new UserDB({ ...usuario });
    const usuarioCreado = await this.usuariosDao.createOne(nuevoUsuario);
    logger.http('Nuevo usuario: ', usuarioCreado.get());
    return usuarioCreado.get();
  }

  async updateOne(id, update) {
    const usuario = await this.usuariosDao.findOneById(id);
    if (!usuario) throw new EntitiyNotFoundError('Usuario');
    const nuevoUsuario = await this.usuariosDao.updateOne(id, update);
    logger.http('Usuario actualizado: ', nuevoUsuario.get());
    return nuevoUsuario.get();
  }

  async deleteOne(id) {
    const ans = await this.usuariosDao.deleteOne(id);
    if (ans == 0) throw new EntitiyNotFoundError(`Usuario con id: ${id}`);
    logger.info('Usuario eliminado: ', { id });
    return ans; // 1
  }

  async findOneByEmail(email) {
    const usuario = await this.usuariosDao.findByEmail(email.toLowerCase());
    if (!usuario) return null;
    return usuario.get();
  }
}
export default UsersService = new UsersService(UsuariosDao);

// async deleteInnactive() {
//   // Buscar usuarios inactivos
//   const fechaDosDiasAtras = new Date();
//   fechaDosDiasAtras.setDate(fechaDosDiasAtras.getDate() - 2);

//   try {
//     const innactiveUsers = await this.usuariosDao.findOne({
//       last_connection: { $lt: fechaDosDiasAtras },
//     });
//     if (innactiveUsers.length === 0) {
//       logger.error('No hay usuarios inactivos');
//       return;
//     }
//     innactiveUsers.forEach(async (user) => {
//       await sendAccountDeletionEmail(user);
//       await this.deleteOne(user._id);
//     });
//     return;
//   } catch (error) {
//     console.error('Error al buscar usuarios inactivos:', error);
//     return;
//   }
// }

// async upgradeOrDowngradeUser(id, newRole) {
//   const user = await this.usuariosDao.findOneById(id);
//   if (user.role === 'admin') throw new CannotChangeAdminRoleError();
//   if (user.role === newRole) throw new UserAlreadyThisRoleError(newRole);
//   if (newRole === 'admin') throw new CannotTurnUserIntoAdminError();
//   if (newRole === 'premium') {
//     const missingDocuments = returnMissingDocuments(user);
//     if (missingDocuments.length > 0) {
//       throw new MissingRequiredDocumentsError(missingDocuments);
//     }
//   }
//   return await this.updateOne(id, { role: newRole });
// }
