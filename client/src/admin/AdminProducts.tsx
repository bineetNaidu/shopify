import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';

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
  reviews: [];
  // __v: string
}

const AdminProducts = () => {
  // States
  const [products, setProducts] = useState<[P] | Array<P>>([]);
  const [open, setOpen] = useState(false);

  // Hooks
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get('/api/p');
      const products: [P] = data.products;
      setProducts(products);
    })();
  }, []);

  // Functions
  const handleClick = () => setOpen(!open);

  return (
    <div className="admin__products">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {products.map((p) => (
            <ListItem key={p._id}>
              <ListItemAvatar>
                <Avatar>
                  <LoyaltyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Single-line item" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
};

export default AdminProducts;
