import ServiciosService from '../services/servicios.service.js';

class ServiciosController {
  getAll = async (req, res) => {
    try {
      const servicios = await ServiciosService.getAll();
      res.status(200).json({
        message: 'Servicios: ',
        servicios: {
          ...servicios,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ServiciosService.findOne(id);
      res.status(200).json({ message: 'Servicio found', product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createOne = async (req, res) => {
    try {
      const createdServicio = await ServiciosService.createOne({
        ...req.body,
      });
      res.status(200).json({ message: 'Servicio created', createdServicio });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  updateOne = async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;
      const updatedServicio = await ServiciosService.updateOne(id, update);
      res.status(200).json({ message: 'Servicio updated', updatedServicio });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  deleteOne = async (req, res) => {
    try {
      const {
        params: { id },
        user,
      } = req;
      const servicioDeleted = await ServiciosService.deleteOne(id, user);
      res.status(200).json({ message: 'Servicio deleted', servicioDeleted });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new ServiciosController();
