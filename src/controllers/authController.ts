import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

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
      authentication: {
        password: hashedPassword,
      },
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: 'User created successfully', newUser })
      .end();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      '+authentication.password +authentication.token'
    );

    const userId = user?._id;

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    if (!jwtSecret || !user.authentication?.password) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.authentication.password
    );

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    if (user.authentication.token) {
      return res.status(400).json({ message: 'Already logged in' });
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id, name: user.fullName },
      jwtSecret,
      {
        expiresIn: '7d',
      }
    );

    user.authentication.token = token;
    await user.save();

    res
      .status(200)
      .json({ message: 'Login successful', token: user.authentication.token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({ 'authentication.token': token }).select(
      '+authentication.token'
    );

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    if (!user?.authentication?.token) {
      return res.status(400).json({ message: 'User is not logged in' });
    }

    user.authentication.token = '';
    await user.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { register, login, logout };
