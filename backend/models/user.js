import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['pet_parent', 'doctor', 'walker'],
    required: true
  },
  avatar: { type: String, default: null },
  address: { type: String, default: "" },
  bio: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
