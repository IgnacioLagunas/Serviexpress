import { MissingDataError } from '../errors/errors.js';
import ReservasService from '../services/reservas.service.js';

class ReservasController {
  getAll = async (req, res) => {
    try {
      const reservas = await ReservasService.getAll();
      res.status(200).json({
        message: 'Reservas: ',
        reservas: {
          ...reservas,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getByUser = async (req, res) => {
    try {
      const { id } = req.body;
      const reservas = await ReservasService.getByUser(id);
      res.status(200).json({
        message: 'Reservas: ',
        email,
        reservas: {
          ...reservas,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await ReservasService.findOne(id);
      res.status(200).json({ message: 'Reserva found', reserva });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createOne = async (req, res) => {
    try {
      let { usuario_id, servicio_id } = req.params;
      let { fecha_hora } = req.body;
      if (!servicio_id) throw new MissingDataError('Servicio');
      usuario_id = usuario_id ? usuario_id : req.user.id;

      const createdReserva = await ReservasService.createOne(
        usuario_id,
        servicio_id,
        fecha_hora
      );
      res.status(200).json({ message: 'Reserva creada', createdReserva });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  updateOne = async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;
      const updatedReserva = await ReservasService.updateOne(id, update);
      res.status(200).json({ message: 'Reserva updated', updatedReserva });
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
      const servicioDeleted = await ReservasService.deleteOne(id, user);
      res.status(200).json({ message: 'Reserva deleted', servicioDeleted });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new ReservasController();
