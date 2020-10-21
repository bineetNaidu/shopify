import Axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Statics
import "./Product.css"

interface ReviewTypes {
  _id: string,
  comment: string,
  rating: number
}

interface RouterProps {
  pID: string;
}

interface P {
  qty: number,
  varified: boolean,
  images: [string],
  price: number,
  countInStock: number,
  name: string,
  _id: string,
  category: string,
  description: string,
  reviews: ReviewTypes[],
  avgRating: number;
  // __v: string
}
const Product: React.FC = () => {
  const { pID } = useParams<RouterProps>()
  
  // States
  const [product, setProduct] = useState<P>();

  // Hooks
  useEffect(() => {

    (async() => {
      const { data } = await Axios.get(`/api/p/${pID}`)
      const productData : P = {...data.product}
      setProduct(productData)
    })()

  }, [pID])

  return (
    <>
      {product && (
        <div className="product">
          <div className="product__details">
            
            <div className="product__left">
              <img src={product.images[0]} alt=""/>
            </div>
            <div className="product__right">
              <p className="product__name">{product.name}</p>
              <p className="product__category">{product.category}</p>
              <p className="product__price">${product.price} <span className="product__taxes">Incl. taxes</span></p>
              <p className="product__desc">{product.description}</p>
              <div className="product__addBasket">
                <Button variant="contained" color="primary" fullWidth>ADD TO BAG</Button>
                <p className="product__deleveryPin">Delivery Details</p>
                <TextField label="Pincode" variant="outlined" fullWidth margin='normal' />
                <p className="product__deleveryAdOns">
                  <span>$</span> Cash on Delivery might be available
                </p>
              </div>
            </div>
            
          </div>

          <div className="product__dummy">
            <div className="dummy__left">
              <div className="dummy__context">
                <h4 className="dummy__head">
                  PRODUCT DESCRIPTION
                </h4>
                <p className="dummy__body">
                  This Official Shopify is what you need to be motivated to work. Pair it with comfy bottoms to attend all your virtual meetings in style.
                </p>
              </div>
              <div className="dummy__context">
                <h4 className="dummy__head">
                  REGULAR FIT
                </h4>
                <p className="dummy__body">
                  Fits just right - not too tight, not too loose.
                </p>
              </div>
            </div>
            <div className="dummy__right">
              <div className="dummy__context">
                <h4 className="dummy__head">
                  SHOPIFY COINS INFO
                </h4>
                <p className="dummy__body">
                  Shopify coins cannot be redeemed on already discounted products
                </p>
              </div>
              <div className="dummy__context">
                <h4 className="dummy__head">
                  15 DAY RETURNS
                </h4>
                <p className="dummy__body">
                  If you arent satisfied with this product, return it for a refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}  
    </>
  )
}

export default Product
