import { Sequelize } from 'sequelize';

// Crear una instancia de Sequelize
const sequelize = new Sequelize('Serviexpress', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate(); // Intentar la conexión
    console.log('Conexión establecida con éxito.');
  } catch (error) {
    console.log('Error al conectar con la base de datos:', error);
  }
}

export { sequelize, connectDB };
