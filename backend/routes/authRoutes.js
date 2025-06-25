import express from 'express';
import { register, login, updateUser, updatePassword } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/update", protect, updateUser);
router.put("/update-password", protect, updatePassword);

export default router;
