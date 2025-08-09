import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  revisedPrompt: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    // required: true // Uncomment when you implement authentication
  }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;