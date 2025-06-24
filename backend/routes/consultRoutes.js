import express from 'express';
import protect  from '../middleware/authMiddleware.js';
import { createConsultation, updateConsultation, getUserConsultations } from '../controllers/consultController.js';
import multer from 'multer'; // assuming you're using multer for file uploads

const router = express.Router();
const upload = multer(); 

// Apply the protect middleware to all routes
router.use(protect);

// Routes
router.post('/', createConsultation);
router.get('/', getUserConsultations);
router.put('/:id', updateConsultation);

// Route for uploading a prescription file
router.put('/prescription/:id', upload.single('file'), async (req, res) => {
  try {
    const updated = await Consultation.findByIdAndUpdate(
      req.params.id,
      { prescriptionFile: req.file.path },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Prescription upload failed', err });
  }
});

export default router;
