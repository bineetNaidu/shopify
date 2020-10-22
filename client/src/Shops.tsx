import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';
import ErrorScreen from './ErrorScreen';

// Statics
import './Shops.css';

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

const Shops = () => {
  // States
  const [items, setItems] = useState<P[]>([]);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState<null | string>(null);

  // Hooks
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get('/api/p');
        const products: P[] = data.products;
        setItems(products);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <>
      {items ? (
        <div className="shops">
          <div className="shops_category">
            <ListItem button onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button selected>
                  <ListItemText primary="Electronics" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Clothes" />
                </ListItem>
              </List>
            </Collapse>
          </div>

          <div className="shops__items">
            {items.map((p) => (
              <div key={p._id} className="shops__item">
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ErrorScreen errMsg={error} />
      )}
    </>
  );
};

export default Shops;
