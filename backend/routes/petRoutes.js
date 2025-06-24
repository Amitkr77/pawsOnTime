import express from 'express';
import protect  from '../middleware/authMiddleware.js';
import { createPet, getMyPets, updatePet, deletePet } from '../controllers/petController.js';
import upload from '../middleware/upload.js'; 

const router = express.Router();

// Apply 'protect' middleware to all routes after this line
router.use(protect);

// Create a new pet with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const petData = {
      ...req.body,
      user: req.user.id,
      image: req.file.path, // Cloudinary URL or path where the image is stored
    };
    const newPet = await Pet.create(petData);
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', err });
  }
});

// Get all pets for the current user
router.get('/', getMyPets);

// Update pet info by ID
router.put('/:id', updatePet);

// Delete pet by ID
router.delete('/:id', deletePet);

export default router;
