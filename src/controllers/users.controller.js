import { UserResponse } from '../data-access/dtos/userDTOs.js';
import {
  EntitiyNotFoundError,
  MissingDataError,
  RequestBodyRequiredError,
} from '../errors/errors.js';
import UsersService from '../services/users.service.js';
import { isObjectEmpty } from '../utils/utils.js';

class UsersController {
  getAllUsers = async (req, res) => {
    try {
      const users = await UsersService.getAll();
      res.status(200).json({ message: 'users: ', users });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await UsersService.findOneByEmail(email);
      if (!user) throw new EntitiyNotFoundError('User');
      res.status(200).json({ message: 'User found', user: UserResponse(user) });
    } catch (error) {
      console.log(error);
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  findUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UsersService.findOne(id);
      if (!user) throw new EntitiyNotFoundError('User');
      res.status(200).json({ message: 'User found', user });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  createNewUser = async (req, res) => {
    try {
      const { first_name, last_name, email } = req.body;
      if ((!first_name, !last_name, !email)) {
        throw new MissingDataError();
      }
      const createdUser = await UsersService.createOne(req.body);
      res.status(200).json({ message: 'User created', createdUser });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;
      if (isObjectEmpty(update)) {
        throw new RequestBodyRequiredError();
      }
      await UsersService.updateOne(id, update);
      res.status(200).json({ message: 'Usuario Actualizado con éxito!' });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  upgradeOrDowngradeUser = async (req, res) => {
    try {
      const { id, role } = req.params;
      await UsersService.upgradeOrDowngradeUser(id, role);
      res.status(200).json({ message: `User's role updated to ${role}` });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const userDeleted = await UsersService.deleteOne(id);
      res.status(200).json({ message: 'User deleted', userDeleted });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  deleteInnactiveUsers = async (req, res) => {
    try {
      await UsersService.deleteInnactive();
      res.status(200).json({ message: 'Innactive users deleted' });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  saveUserDocuments = async ({ user: { _id }, files }, res) => {
    try {
      const updatedUser = await UsersService.saveDocuments(_id, files);
      res.status(200).json({ message: 'User documents updated', updatedUser });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };
}

export default new UsersController();
