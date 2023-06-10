import { Router } from 'express';
import User from '../models/userModel';

export default (router: Router) => {
  router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
};
