import express from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import reviewRoutes from './reviewRoutes';

const router = express.Router();

export default () => {
  userRoutes(router);
  authRoutes(router);
  productRoutes(router);
  reviewRoutes(router);
  return router;
};
