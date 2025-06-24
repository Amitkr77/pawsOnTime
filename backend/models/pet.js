import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true, 
    min: [0, 'Age cannot be negative'] 
  },
  breed: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Unknown'], 
    default: 'Unknown' 
  },
  weight: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['dog', 'cat', 'other'], 
    required: true 
  },
  image: { 
    type: String, 
    default: null 
  },
  medicalNotes: { 
    type: String, 
    default: null 
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Pet', petSchema);
