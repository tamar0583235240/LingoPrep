import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController';
import express from 'express';

const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;
