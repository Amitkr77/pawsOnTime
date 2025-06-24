import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    type: {
      type: String,
      enum: ['feeding', 'medication', 'grooming', 'vaccination', 'deworming'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: '', // Default to an empty string if no notes are provided
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Schedule', scheduleSchema);
