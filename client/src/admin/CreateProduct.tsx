import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import useFormValue from '../hooks/useFormState';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

// Statics
import './CreateProduct.css';

const CreateProduct = () => {
  const [productName, handleProductName, resetName] = useFormValue('');
  const [qty, handleQty, resetQty] = useFormValue(1);
  const [price, handlePrice, resetPrice] = useFormValue(0);
  const [img, handleImg, resetImage] = useFormValue('');
  const [desc, handleDesc, resetDesc] = useFormValue('');
  const [countInStock, handleCountInStock, resetCountInStock] = useFormValue(5);
  const [varified, setVarified] = useState(false);

  return (
    <form className="createProduct">
      <TextField
        label="Product Name"
        value={productName}
        onChange={handleProductName}
        variant="outlined"
      />
      <TextField
        label="Quantity"
        type="number"
        value={qty}
        variant="outlined"
        onChange={handleQty}
      />
      <TextField
        label="Product Image"
        value={img}
        onChange={handleImg}
        variant="outlined"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={varified}
            onChange={() => setVarified(!varified)}
            name="Varified"
          />
        }
        label="Varified"
      />
      <TextField
        label="Product Description"
        multiline
        rows={4}
        value={desc}
        onChange={handleDesc}
        variant="outlined"
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="product-price">Price</InputLabel>
        <OutlinedInput
          id="product-price"
          value={price}
          onChange={handlePrice}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
        />
      </FormControl>
      <TextField
        label="in Shock"
        type="number"
        value={countInStock}
        onChange={handleCountInStock}
        variant="outlined"
      />
    </form>
  );
};

export default CreateProduct;
