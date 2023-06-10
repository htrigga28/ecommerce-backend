import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import bodyParser from 'body-parser';

const app = express();

const PORT = 5000;

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use('/', router());

mongoose
  .connect('mongodb://localhost/ecommerce-app-db')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
