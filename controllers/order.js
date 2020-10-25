import Order from '../model/Order.js';
import User from '../model/User.js';
import { ExpressError } from '../utils/ExpressError.js';

export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('product');
  if (!orders) {
    throw new ExpressError('Server Error!', 500);
  }
  res.json({
    success: true,
    length: orders.length,
    orders,
  });
};

export const getUsersOrders = async (req, res) => {
  const orders = await Order.find({})
    .where({ user: req.params.uid })
    .populate('product');

  if (!orders) {
    throw new ExpressError('No Orders for given users', 500);
  }

  res.json({
    success: true,
    length: orders.length,
    orders,
  });
};

export const createUserOrder = async (req, res) => {
  const user = await User.findOne({ _id: req.params.uid });
  if (!user) throw new ExpressError('User Not Found!', 500);
  const order = new Order(req.body);
  if (!order) throw new ExpressError('Server Error!', 500);
  order.user = user._id;
  await order.save();
  res.json({
    success: true,
    length: order.length,
    order,
  });
};

export const editUserOrder = async (req, res) => {
  const user = await User.findOne({ _id: req.params.uid });
  if (!user) throw new ExpressError('User Not Found!', 500);
  const order = await Order.findOneAndUpdate(
    { _id: req.params.oID },
    { ...req.body }
  );
  if (!order) throw new ExpressError('Server Error!', 500);

  res.json({
    success: true,
    length: order.length,
    order,
  });
};

export const deleteUserOrder = async (req, res) => {
  const user = await User.findOne({ _id: req.params.uid });
  if (!user) throw new ExpressError('User Not Found!', 500);
  const order = await Order.findOne({ _id: req.params.oID });

  if (order.user.equals(user._id)) {
    await order.remove();
    res.json({
      success: true,
      msg: 'Successfully deleted',
    });
  } else {
    throw new ExpressError('Unauthorized', 500);
  }
};
