import { Router } from 'express';
import { getProductById, getProducts } from '../controllers/productController';

export default (router: Router) => {
  router.get('/products', getProducts);
  router.get('/products/:id', getProductById);
};
