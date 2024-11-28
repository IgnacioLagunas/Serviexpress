import Reserva from '../models/reserva.model.js';
import Usuario from '../models/usuario.model.js';
import Servicio from '../models/servicio.model.js';
import BasicDAO from './basic.dao.js';

class ReservasDAO extends BasicDAO {
  constructor() {
    super(Reserva);
  }

  async getByUserPK(id) {
    return await this.getMany({
      where: { usuario_id: id },
      include: ['usuario', 'servicio'],
    });
  }

  async getAll() {
    return await this.model.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['email', 'nombre', 'apellido'],
        },
        {
          model: Servicio,
          as: 'servicio',
          attributes: ['descripcion', 'precio'],
        },
      ],
    });
  }
}

export default new ReservasDAO();
