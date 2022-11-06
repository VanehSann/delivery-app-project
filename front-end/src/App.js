import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminManage from './pages/AdminManage';
import Checkout from './pages/Checkout';
import Customer from './pages/Customer';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrdersDetails from './pages/CustomerOrdersDetails';
import Login from './pages/Login';
import Register from './pages/Register';
// import SellerOrders from './pages/SellerOrders';
// import SellerOrdersDetails from './pages/SellerOrdersDetails';

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
        <Route exact path="/customer/orders" component={ CustomerOrders } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrdersDetails } />
        {/* <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } /> */}
      </Switch>
    );
  }
}

export default App;
