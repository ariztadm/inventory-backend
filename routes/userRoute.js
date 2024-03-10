import express from 'express';
import {
  getUsers,
  userLogin,
  userLogout,
  userRegister,
  //   getUserById,
  //   createUser,
  //   updateUser,
  //   deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { refreshToken } from '../middleware/refreshToken.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', userRegister);
router.post('/login', userLogin);
router.get('/token', refreshToken);
router.delete('/logout', userLogout);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
