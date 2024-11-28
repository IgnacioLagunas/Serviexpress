class BasicDAO {
  model;

  constructor(model) {
    this.model = model; // El modelo Sequelize que se usará
  }

  // Obtiene todos los registros
  async getAll() {
    return await this.model.findAll();
  }

  // Crea un registro
  async createOne(obj) {
    return await this.model.create(obj);
  }

  // Actualiza un registro por su ID
  async updateOne(id, newObj) {
    const instance = await this.model.findByPk(id); // Busca por Primary Key
    if (!instance) {
      throw new Error('Registro no encontrado');
    }
    return await instance.update(newObj); // Actualiza los campos del registro
  }

  // Elimina un registro por su ID
  async deleteOne(id) {
    const instance = await this.model.findByPk(id);
    if (!instance) {
      throw new Error('Registro no encontrado');
    }
    return await instance.destroy(); // Elimina el registro
  }

  // Elimina registros que coinciden con una consulta
  async deleteMany(query) {
    return await this.model.destroy({ where: query }); // destroy acepta un where para filtrar
  }

  // Encuentra un registro por ID
  async findOneById(id) {
    return await this.model.findByPk(id); // findByPk busca por Primary Key
  }

  // Encuentra un registro que coincida con una consulta
  async findOne(query) {
    return await this.model.findOne(query); // findOne usa where para filtrar
  }
}

export default BasicDAO;
