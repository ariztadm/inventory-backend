import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import userRoute from './routes/userRoute.js';
// import Users from './models/userModel.js';
import productRoute from './routes/productRoute.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = 5000;

try {
  await db.authenticate();
  console.log('Database connected!');
  //   await Users.sync();
 
} catch (error) {
  console.log(error);
}

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use(cookieParser());
app.use(express.json());
// app.use(FileUpload());
// app.use(express.static('public'));
app.use(userRoute);
app.use(productRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
