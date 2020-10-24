import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import ErrorScreen from './ErrorScreen';
import CarouselBar from './Carousel';

// Statics
import './Home.css';

interface ReviewTypes {
  _id: string;
  comment: string;
  rating: number;
}

interface P {
  qty: number;
  varified: boolean;
  images: string[];
  price: number;
  countInStock: number;
  name: string;
  _id: string;
  category: string;
  description: string;
  reviews: ReviewTypes[];
  // __v: string
}

const Home = () => {
  // States
  const [products, setProducts] = useState<[P] | Array<P>>([]);
  const [error, setError] = useState<null | string>(null);

  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get('/api/p');
        if (!data.products) throw new Error(data.error);
        const products: [P] = data.products;
        setProducts(products.filter((p) => p.price < 13));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <>
      {!error ? (
        <div className="home">
          <div className="home__carousel">
            <CarouselBar />
          </div>
          <div className="home__productLabel">
            <h2>Best Deals</h2>
            <Link to="/s">View all</Link>
          </div>
          <div className="home__productLists">
            {products.map((p) => (
              <ProductCard key={p._id} {...p} />
            ))}
          </div>
        </div>
      ) : (
        <ErrorScreen errMsg={error} />
      )}
    </>
  );
};

export default Home;
