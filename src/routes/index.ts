import express from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

export default () => {
  userRoutes(router);
  authRoutes(router);
  return router;
};
