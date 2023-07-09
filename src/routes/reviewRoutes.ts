import { Router } from 'express';
import { createReview, deleteReview } from '../controllers/reviewController';

export default (router: Router) => {
  router.post('/products/:id/review', createReview);
  router.post('/review/:id', deleteReview);
};
