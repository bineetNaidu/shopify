import Order from '../model/Order.js';
import User from '../model/User.js';
import { ExpressError } from '../utils/ExpressError.js';

export const getOrders = async (req, res) => {
  const orders = await Order.find({});
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
  const orders = await Order.find({}).where({ user: req.params.uid });

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
