import React from 'react'

// Statics
import "./ProductCard.css"

interface ReviewTypes {
  _id: string,
  comment: string,
  rating: number
}

interface Props {
  qty: number,
  varified: boolean,
  images: string[],
  price: number,
  countInStock: number,
  name: string,
  _id: string,
  category: string,
  description: string,
  reviews: ReviewTypes[],
  // __v: string
}

const ProductCard : React.FC <Props> = ({images,name,price,varified, reviews}) => {
  return (
    <div className="productCard">
      <img src={images[0]} alt={name} className="productCard__image" />
      <div className="productCard__footer">
        <p className="productCard__name">{name}</p>
        <p className="productCard__review">{reviews?.length} Reviews</p>
        <p className="productCard__price">${price}</p>
      </div>
    </div>
  )
}

export default ProductCard
