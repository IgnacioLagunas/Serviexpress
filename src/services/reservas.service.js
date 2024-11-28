import ReservasDao from '../data-access/daos/reservas.dao.js';
import ServiciosDao from '../data-access/daos/servicios.dao.js';
import UsuariosDao from '../data-access/daos/usuarios.dao.js';
import { EntitiyNotFoundError } from '../errors/errors.js';
import { logger } from '../utils/logger.utils.js';
import { ReservaDB } from '../data-access/dtos/reservaDTO.js';

class ReservasService {
  constructor(ReservasDao, ServiciosDao, UsuariosDao) {
    this.reservasDao = ReservasDao;
    this.serviciosDao = ServiciosDao;
    this.usuariosDao = UsuariosDao;
  }
  async getAll() {
    const reservas = await this.reservasDao.getAll();
    return reservas.map((user) => user.get());
  }
  async getByUser(id) {
    const user = await this.usuariosDao.findOneById(id);
    if (!user) throw new EntitiyNotFoundError(`Usuario id: ${id}`);
    const reservas = await this.reservasDao.getByUserPK(user.get().id);
    return reservas.map((reserva) => reserva.get());
  }

  async createOne(usuario_id, servicio_id, fecha_hora) {
    const servicioExiste = await this.serviciosDao.findOneById(servicio_id);
    if (!servicioExiste) throw new EntitiyNotFoundError('Servicio');
    const nuevaReserva = new ReservaDB(usuario_id, servicio_id, fecha_hora);
    console.log(nuevaReserva);
    const reservaCreada = await this.reservasDao.createOne(nuevaReserva);
    logger.http('Nueva reserva: ', reservaCreada.get());
    return reservaCreada.get();
  }

  async updateOne(id, update) {
    const reserva = await this.reservasDao.findOneById(id);
    if (!reserva) throw new EntitiyNotFoundError('Reserva');
    const nuevaReserva = await this.reservasDao.updateOne(id, update);
    logger.http('Reserva actualizada: ', nuevaReserva.get());
    return nuevaReserva.get();
  }

  async deleteOne(id) {
    const reserva = await this.reservasDao.findOneById(id);
    if (!reserva) throw new EntitiyNotFoundError('Reserva');
    const ans = await this.reservasDao.deleteOne(id);
    if (ans == 0) throw new Error(`Error al eliminar reserva`);
    logger.info('Reserva eliminada: ', reserva.get());
    return reserva.get(); // 1
  }
}
export default new ReservasService(ReservasDao, ServiciosDao, UsuariosDao);
