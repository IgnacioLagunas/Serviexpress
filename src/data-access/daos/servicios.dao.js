import Servicio from '../models/servicio.model.js';
import BasicDAO from './basic.dao.js';

class ServiciosDAO extends BasicDAO {
  constructor() {
    super(Servicio);
  }
}

export default new ServiciosDAO();
