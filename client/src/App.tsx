import React from 'react'
import Header from './Header';
import { Switch, Route } from "react-router-dom"
import Home from './Home';
import Shops from './Shops';
import Product from './Product';

// statics
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/s' component={Shops} />
        <Route exact path='/s/:pID' component={Product} />
      </Switch>
    </div>
  )
}

export default App
