import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    enum: ['male', 'female', 'Unknown'],
    default: 'Unknown'
  },
  weight: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['dog', 'cat', 'bird', 'rabbit'],
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

petSchema.virtual("schedules", {
  ref: "Schedule",
  localField: "_id",
  foreignField: "pet"
});

petSchema.virtual("consultations", {
  ref: "Consultation",
  localField: "_id",
  foreignField: "pet"
});

petSchema.virtual("walkRequests", {
  ref: "Walker",
  localField: "_id",
  foreignField: "pet"
});

petSchema.set("toJSON", { virtuals: true });
petSchema.set("toObject", { virtuals: true });


export default mongoose.model('Pet', petSchema);
