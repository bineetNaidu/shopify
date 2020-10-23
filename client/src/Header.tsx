import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { useStateValue } from './context/State.Context';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Statics
import './Header.css';

const Header: React.FC = () => {
  const [{ user }] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Button onClick={handleClick}>
              <PersonIcon />
              Account
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{user.username}</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
              {user.isAdmin && (
                <MenuItem>
                  <Link to="/admin">Admin</Link>
                </MenuItem>
              )}
            </Menu>
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
