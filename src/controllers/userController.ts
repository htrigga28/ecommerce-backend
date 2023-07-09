import { Request, Response } from 'express';
import User from '../models/userModel';

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const user = await User.find();

  res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const { firstName, lastName }: { firstName: string; lastName: string } =
      req.body;

    if (!firstName && !lastName) {
      return res
        .status(400)
        .json({ message: 'At least one of firstName or lastName is required' });
    }

    if (user) {
      if (firstName) {
        user.firstName = firstName;
      }

      if (lastName) {
        user.lastName = lastName;
      }

      user.fullName = `${user.firstName} ${user.lastName}`;
      await user.save();

      return res.status(200).json(user).end();
    }
  } catch (err) {
    return res.status(404).json({ message: 'User not found', error: err });
  }
};
