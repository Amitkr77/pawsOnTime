import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  petParent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  zoomLink: { type: String, default: null },
  notes: { type: String, default: null },
  prescriptionFile: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model('Consultation', consultationSchema);
