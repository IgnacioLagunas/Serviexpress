import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.config.js';
import Usuario from './usuario.model.js';
import Servicio from './servicio.model.js';

class Reserva extends Model {}

Reserva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Pendiente',
      validate: {
        isIn: [['Pendiente', 'Confirmada', 'Cancelada']], // Solo acepta estos valores
      },
    },
  },
  {
    sequelize,
    modelName: 'Reserva',
    tableName: 'reservas_horas',
    timestamps: false,
  }
);

// Relación con Usuario (FK: usuario_id)
Reserva.belongsTo(Usuario, {
  foreignKey: {
    name: 'usuario_id',
    allowNull: false,
  },
  as: 'usuario', // Alias para la relación
});

// Relación con Servicio (FK: servicio_id)
Reserva.belongsTo(Servicio, {
  foreignKey: {
    name: 'servicio_id',
    allowNull: false,
  },
  as: 'servicio', // Alias para la relación
});

export default Reserva;
