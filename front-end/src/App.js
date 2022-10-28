import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import ClientBar from './pages/ClientBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/customer/products" component={ ClientBar } />
      </Switch>
    );
  }
}

export default App;
