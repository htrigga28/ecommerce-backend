import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController';

export default (router: Router) => {
  router.get('/users', getAllUsers);
  router.get('/user/:id', getUser);
  router.patch('/user/:id', updateUser);
};
