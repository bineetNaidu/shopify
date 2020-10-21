import React from 'react'

// Statics
import "./ProductLists.css"

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

const Product : React.FC <Props> = ({_id,category,countInStock,description,images,name,price,qty,varified, reviews}) => {
 return (
  <div className="productLists">
    <img src={images[0]} alt={name} className="productLists__image" />
   <div className="productLists__footer">
    <p className="productLists__name">{name}</p>
    {/* {Array(rating)
            .fill()
            .map((_, i) => (
              <span role="img" key={i} aria-labelledby="start emoji">
                ⭐
              </span>
            ))} */}
    <p className="productLists__review">{reviews?.length} Reviews</p>
    <p className="productLists__price">${price}</p>
   </div>
  </div>
 )
}

export default Product
