import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { useStateValue } from './context/State.Context';

// Statics
import './Header.css';

const Header: React.FC = () => {
  const [{ user }] = useStateValue();
  return (
    <div className="header">
      <Link to="/">
        <h3 className="header__brand">Shopify</h3>
      </Link>
      <div className="header__ctx">
        {user !== null ? (
          <>
            <Button>
              <ShoppingCartIcon />
              Cart
            </Button>
            <Button>
              <PersonIcon />
              Account
            </Button>
          </>
        ) : (
          <>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button>
              <Link to="/signup">New To Shopify</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
