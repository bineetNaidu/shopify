import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

// Statics
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className="header">
      <Link to="/">
        <h3 className="header__brand">Shopify</h3>
      </Link>
      <div className="header__ctx">
        <Button>
          <ShoppingCartIcon />
          Cart
        </Button>
        <Button>
          <PersonIcon />
          Account
        </Button>
      </div>
    </div>
  );
};

export default Header;
