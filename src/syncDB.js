import { sequelize } from './config/db.config.js';
import Usuario from './data-access/models/usuario.model.js';
// import Boleta from '../models/boleta';
// import Detalle_Boleta from '../models/detalle_boleta';
// import Servicio from '../models/servicio';
// import Reserva from '../models/reserva';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Cambiar a { alter: true } si no quieres borrar datos.
    console.log('¡Base de datos sincronizada correctamente!');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
