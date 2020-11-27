import React, { memo, useState } from 'react';
import { useStateValue } from './context/State.Context';
import TextField from '@material-ui/core/TextField';
import useFormState from './hooks/useFormState';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import checkout from './utils/checkout';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Cart = () => {
  const history = useHistory();
  const [{ cart, user }, dispatch] = useStateValue();
  const [address, handleAdrress, resetAddress] = useFormState('');
  const [postalCode, handlePostal, resetPostalCode] = useFormState(0);
  const [checked, setChecked] = useState(false);
  const [msg, setMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const totalPrice = cart.reduce(
    (amount: any, item: { price: any }) => item.price + amount,
    checked ? 5 : 0
  );

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
    setMsg('');
  };

  const removeFromBasket = (id: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id,
    });
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && address && postalCode) {
      for (let orderItem of cart) {
        const res = await checkout(
          orderItem.id,
          user,
          address,
          postalCode,
          orderItem.price,
          checked
        );
        // alert(res);
        setMsg(res);
        setOpenAlert(true);
      }
      resetAddress();
      resetPostalCode();
      dispatch({ type: 'EMPTY_CART' });
      history.push('/orders');
    }
  };

  return (
    <div className="cart">
      <div className="cart__left">
        {cart.length ? (
          <>
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
          </>
        ) : (
          <h2>Look Like Empty</h2>
        )}
      </div>
      <div className="cart__right">
        <form onSubmit={handleCheckout}>
          <h1>Proceed Checkout</h1>
          <TextField
            value={address}
            onChange={handleAdrress}
            margin="normal"
            label="Address"
            variant="outlined"
          />
          <TextField
            value={postalCode}
            type="number"
            onChange={handlePostal}
            label="Postal Code"
            margin="normal"
            variant="outlined"
          />
          <h3>
            Total Price:
            <strong> ${totalPrice}</strong>
          </h3>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                name="checkedA"
              />
            }
            label="Shipping Cost ($5)"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!cart.length}
          >
            Checkout
          </Button>
        </form>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default memo(Cart);
