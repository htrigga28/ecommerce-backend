import { Router } from 'express';
import { login, logout, register } from '../controllers/authController';

export default (router: Router) => {
  router.post('/login', login);
  router.post('/auth/signup', register);
  router.get('/logout/:id', logout);
};
