import express from 'express';
import {  createUserByAdmin, deleteUserByAdmin, getAllUsers, getUserById, updateUserByAdmin } from '../controllers/userController';

const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUserByAdmin);
router.put('/:id', updateUserByAdmin);
router.delete('/:id', deleteUserByAdmin);

// export const userRouts = router;
export default router;
