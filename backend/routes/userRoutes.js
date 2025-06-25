import express from 'express'
import { getUserDetails } from '../controllers/authController.js';
const router = express.Router();

router.get("/:id/details", getUserDetails);

export default router