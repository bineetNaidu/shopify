import Order from '../model/Order.js';
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
  const orders = await Order.findOne({ user: req.params.uid });

  if (!orders) {
    throw new ExpressError('No Orders for given users', 500);
  }

  res.json({
    success: true,
    length: orders.length,
    orders,
  });
};
