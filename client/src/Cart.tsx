import React from 'react';
import { useStateValue } from './context/State.Context';
import ProductCard from './ProductCard';

// Statics
import './Cart.css';

interface CartInterface {
  image: string;
  price: number;
  inStock: number;
  name: string;
  id: string;
  qty: number;
}

const Cart = () => {
  const [{ cart }, dispatch] = useStateValue();

  const totalPrice = cart.reduce(
    (amount: any, item: { price: any }) => item.price + amount,
    0
  );
  const removeFromBasket = (id: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id,
    });
  };

  return (
    <div className="cart">
      <div className="cart__left">
        {cart.map((c: CartInterface) => (
          <div className="cart__item" key={c.id}>
            <button onClick={() => removeFromBasket(c.id)}>X</button>
            <img src={c.image} alt={c.name} />
            <div className="cart__itemDetails">
              <h5>{c.name}</h5>
              <h6>${c.price}</h6>
              <h6>Quatity: {c.qty}</h6>
              {c.qty > c.inStock && (
                <h6>
                  <strong>Out of Stock</strong>
                </h6>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="cart__right">
        <h1>Proceed Checkout</h1>
        <h3>
          Total Price:
          <strong> ${totalPrice}</strong>
        </h3>
      </div>
    </div>
  );
};

export default Cart;
