import express from 'express';
import {
  getUsers,
  userLogin,
  userLogout,
  userRegister,
  
} from '../controllers/userController.js';
import getProduct from './controllers/productController.js';

import { verifyToken } from '../middleware/verifyToken.js';
import { refreshToken } from '../middleware/refreshToken.js';

const router = express.Router();

router.get('/product', getProduct);
router.post('/users', userRegister);
router.post('/login', userLogin);
router.get('/token', refreshToken);
router.delete('/logout', userLogout);


export default router;