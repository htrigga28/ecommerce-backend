import { Router } from 'express';
import { login, logout, register } from '../controllers/authController';

export default (router: Router) => {
  router.post('/auth/login', login);
  router.post('/auth/signup', register);
  router.post('/auth/logout', logout);
};
