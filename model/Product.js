import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  // admin: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User',
  // },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    default: 5,
  },
  images: [String],
  varified: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

export default mongoose.model('Product', ProductSchema);
