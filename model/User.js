import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

export default mongoose.model('User', UserSchema);
