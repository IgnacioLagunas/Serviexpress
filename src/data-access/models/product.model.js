import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.config.js';

class Servicio extends Model {}

Servicio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dno%2Bimage%2Bavailable&psig=AOvVaw353-XUks7sdWbHs6uyEF6T&ust=1699055914811000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDBht3CpoIDFQAAAAAdAAAAABAE',
    },
  },
  {
    sequelize, // La instancia de sequelize
    modelName: 'Servicio', // Nombre del modelo
    tableName: 'servicios',
    timestamps: false, // Si no necesitas campos createdAt, updatedAt
  }
);

export default Servicio;
