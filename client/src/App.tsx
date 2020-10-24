import React, { useEffect } from 'react';
import Header from './Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Shops from './Shops';
import Product from './Product';
import Footer from './Footer';
import Admin from './admin/Admin';
import CreateProduct from './admin/CreateProduct';
import EditProduct from './admin/EditProduct';
import { useStateValue } from './context/State.Context';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { setLocalUser } from './utils/SetUser';

// statics
import './App.css';

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (localStorage.shopifyToken !== null) {
      const authUser = setLocalUser(localStorage.shopifyToken);
      dispatch({ type: 'SET_USER', user: authUser });
    }
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/s" component={Shops} />
        <Route exact path="/s/:pID" component={Product} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {user?.isAdmin ? (
          <>
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/create" component={CreateProduct} />
            <Route exact path="/admin/edit/:pID" component={EditProduct} />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
      <Footer />
    </>
  );
};

export default App;
