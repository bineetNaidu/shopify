import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import ProductLists from './ProductLists'

// Statics
import "./Home.css";

interface ReviewTypes {
 _id: string,
 comment: string,
 rating: number
}

interface P {
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

const Home = () => {
 // States
 const [products, setProducts] = useState<[P] | Array<P>>([]);
 
 // Hooks
 useEffect(() => {
  (async() => {
   const { data } = await Axios.get('/api/p');
   const products: [P]  = data.products;
   setProducts([...products])
 })()

 }, [])

 return (
  <div className="home">
   <div className="home__productLists">
    {products.map(p=> <ProductLists key={p._id} {...p} />)}
   </div>
  </div>
 )
}

export default Home
