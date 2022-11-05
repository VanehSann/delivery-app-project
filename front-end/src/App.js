import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminManage from './pages/AdminManage';
import Customer from './pages/Customer';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/admin/manage" component={ AdminManage } />
        <Route exact path="/customer/products" component={ Customer } />
        <Route exact path="/customer/checkout" component={ Checkout } />
      </Switch>
    );
  }
}

export default App;
