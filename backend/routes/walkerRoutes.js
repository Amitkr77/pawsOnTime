import express from 'express';
import  protect  from '../middleware/authMiddleware.js';
import { createWalkRequest, updateWalkRequest, getMyWalks } from '../controllers/walkerController.js';

const router = express.Router();

// Apply the 'protect' middleware to all routes after this line
router.use(protect);

// Create a new walk request
router.post('/', createWalkRequest);

// Get all walk requests for the current user
router.get('/', getMyWalks);

// Update a walk request by ID
router.put('/:id', updateWalkRequest);

export default router;
