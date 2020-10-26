import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useStateValue } from './context/State.Context';
// Statics
import './Order.css';
interface P {
  varified: boolean;
  images: [string];
  price: number;
  countInStock: number;
  name: string;
  _id: string;
  category: string;
  description: string;
  reviews: [];
  avgRating: number;
  // __v: string
}

interface Order {
  product: P;
  user: string;
  address: string;
  postalCode: number;
  price: number;
  shippingPrice: boolean;
  _id: string;
  isDelivered: boolean;
  totalPrice: number;
}

const Order = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`/api/orders/${user?.id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      console.log(data);
      setOrders(data.orders);
      console.log(user);
    })();
  }, []);

  return (
    <div className="order">
      <h1>{user?.username}'s Orders</h1>
      {orders.map((o) => (
        <div className="order__item" key={o._id}>
          <img src={o.product.images[0]} alt={o.product.name} />
          <div className="order__details">
            <h2>{o.product.name}</h2>
            <h3>${o.totalPrice}</h3>
            {o.isDelivered ? (
              <p className="order__status--delivered">
                {' '}
                <span></span> - Has Been Delivered
              </p>
            ) : (
              <p className="order__status--notDelivered">
                {' '}
                <span></span> - Has Not Been Delivered
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
