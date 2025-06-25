import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['pet_parent', 'doctor', 'walker'],
    required: true
  },
  avatar: { type: String, default: "" },  // Default to empty string for avatar
  address: { type: String, default: "" },
  bio: { type: String, default: "" },
  phoneNumber: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // example regex for phone number
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  createdAt: { type: Date, default: Date.now }
});

// Define virtual field for pets
userSchema.virtual('pets', {
  ref: 'Pet',
  localField: '_id',
  foreignField: 'user', // Pet model must have a 'user' field that references this User
});

// Ensure virtuals are included when converting to JSON or plain object
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

// Export the User model
export default mongoose.model('User', userSchema);
