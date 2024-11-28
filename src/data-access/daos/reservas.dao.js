import Reserva from '../models/reserva.model.js';
import Usuario from '../models/usuario.model.js';
import Servicio from '../models/servicio.model.js';
import BasicDAO from './basic.dao.js';

class ReservasDAO extends BasicDAO {
  constructor() {
    super(Reserva);
  }

  async findByUserPK(id) {
    return await this.findMany({
      where: { usuario_id: id },
      include: ['usuario', 'servicio'],
    });
  }

  async findAll() {
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
          attributes: ['descripcion_servicio', 'precio'],
        },
      ],
    });
  }
}

export default new ReservasDAO();
