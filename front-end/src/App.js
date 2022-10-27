import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } />
        <Route path="/login" component={ Login } />
      </Switch>
    );
  }
}

export default App;
