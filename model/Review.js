import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Review', ReviewSchema);
