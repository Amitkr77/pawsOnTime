import express from 'express';
import  protect  from '../middleware/authMiddleware.js';
import { createSchedule, getSchedulesByPet, updateSchedule, deleteSchedule } from '../controllers/schedulerController.js';

const router = express.Router();

// Apply the 'protect' middleware to all routes after this line
router.use(protect);

// Create a new schedule
router.post('/', createSchedule);

// Get schedules for a specific pet by petId
router.get('/:petId', getSchedulesByPet);

// Update schedule by ID
router.put('/:id', updateSchedule);

// Delete schedule by ID
router.delete('/:id', deleteSchedule);

export default router;
