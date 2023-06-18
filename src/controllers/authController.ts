import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const missingParams = [];

    // Check if all required parameters are present
    if (!fullName) {
      missingParams.push('fullName');
    }
    if (!email) {
      missingParams.push('email');
    }
    if (!password) {
      missingParams.push('password');
    }

    if (missingParams.length > 0) {
      return res
        .status(400)
        .json({ message: 'Missing required parameters', missingParams });
    }

    // Check if the fullName or email is already taken
    const fullNameExists = await User.findOne({ fullName });
    const emailExists = await User.findOne({ email });

    if (fullNameExists || emailExists) {
      return res.status(409).json({ message: 'user already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = (await bcrypt.hash(password, salt)).toString();

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' }).end();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password' });
  }
};

const logout = async (req: Request, res: Response) => {};

export { register, login, logout };
