import { Router } from 'express';
import { getUser, updateUser } from '../controllers/userController';

export default (router: Router) => {
  router.get('/user/:id', getUser);
  router.patch('/user/:id', updateUser);
};
