import ServiciosDAO from '../data-access/daos/servicios.dao.js';
import { EntitiyNotFoundError } from '../errors/errors.js';
import { logger } from '../utils/logger.utils.js';

class ServiciosService {
  constructor(ServiciosDAO) {
    this.serviciosDAO = ServiciosDAO;
  }

  async getAll() {
    const servicios = await this.serviciosDAO.getAll();
    return servicios.map((servicio) => servicio.get());
  }

  async createOne(obj) {
    const servicioCreado = await this.serviciosDAO.createOne(obj);
    logger.http('Nuevo usuario: ', servicioCreado.get());
    return servicioCreado.get();
  }

  async updateOne(id, update) {
    const servicio = await this.findOne(id);
    if (!servicio) throw new EntitiyNotFoundError('Servicio');
    const nuevoServicio = await this.serviciosDAO.updateOne(id, update);
    logger.http('Servicio updated: ', nuevoServicio.get());
    return nuevoServicio.get();
  }

  async deleteOne(id) {
    const servicio = await this.serviciosDAO.findOneById(id);
    if (!servicio) throw new EntitiyNotFoundError('Servicio');
    const ans = await this.serviciosDAO.deleteOne(id);
    if (ans == 0) throw new EntitiyNotFoundError(`Servicio con id: ${id}`);
    logger.info('Servicio eliminado: ', { id });
    return servicio.get(); // 1
  }

  async findOne(id) {
    console.log(id);
    if (!id) throw new EntitiyNotFoundError('Id');
    const result = await this.serviciosDAO.findOneById(id);
    if (!result) throw new EntitiyNotFoundError('Servicio');
    return result.get();
  }
}

export default ServiciosService = new ServiciosService(ServiciosDAO);
