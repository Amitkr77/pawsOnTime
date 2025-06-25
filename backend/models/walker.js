import mongoose from 'mongoose';

const walkerSchema = new mongoose.Schema(
  {
    petParent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    walker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      enum: [15, 30], // Duration in minutes
      required: true,
    },
    status: {
      type: String,
      enum: ['requested', 'accepted', 'completed'],
      default: 'requested', 
    },
  },
  { timestamps: true }
);

export default mongoose.model('Walker', walkerSchema);
