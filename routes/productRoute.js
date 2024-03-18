import express from 'express';
import { getProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/product', getProduct);


export default router;