import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Shops from './Shops';
import Product from './Product';
import Footer from './Footer';
import Admin from './admin/Admin';
import CreateProduct from './admin/CreateProduct';
import EditProduct from './admin/EditProduct';

// statics
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/s" component={Shops} />
        <Route exact path="/s/:pID" component={Product} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/create" component={CreateProduct} />
        <Route exact path="/admin/edit/:pID" component={EditProduct} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
