import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import useFormValue from '../hooks/useFormState';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Product Name"
            value={productName}
            fullWidth
            onChange={handleProductName}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="product-price">Price</InputLabel>
            <OutlinedInput
              id="product-price"
              value={price}
              fullWidth
              onChange={handlePrice}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Description"
            multiline
            fullWidth
            rows={4}
            value={desc}
            onChange={handleDesc}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Quantity"
            type="number"
            value={qty}
            variant="outlined"
            fullWidth
            onChange={handleQty}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Product Image"
            value={img}
            onChange={handleImg}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="in Shock"
            type="number"
            value={countInStock}
            onChange={handleCountInStock}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProduct;
