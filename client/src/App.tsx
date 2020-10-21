import React from 'react'
import Header from './Header';
import { Switch, Route } from "react-router-dom"
import Home from './Home';
import Shops from './Shops';

// statics
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/s' component={Shops} />
      </Switch>
    </div>
  )
}

export default App
