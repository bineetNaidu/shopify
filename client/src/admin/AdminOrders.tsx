import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { useStateValue } from '../context/State.Context';
import Axios from 'axios';

interface P {
  varified: boolean;
  images: [string];
  price: number;
  countInStock: number;
  name: string;
  _id: string;
  category: string;
  description: string;
  reviews: [];
  avgRating: number;
  // __v: string
}

interface Order {
  product: P;
  user: string;
  address: string;
  postalCode: number;
  price: number;
  shippingPrice: boolean;
}

export default function NestedList() {
  const [open, setOpen] = React.useState(false);
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [{ user }] = useStateValue();
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data.orders);
    })();
  }, []);

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Orders Placements" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {orders.map((o) => (
            <ListItem button>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={o.product.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
