import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import { requestData, requestPost } from '../utils/axios';
import { getFromLocalStorage } from '../utils/localStorage';

class Customer extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const { email, token } = getFromLocalStorage('user') || {};

    try {
      const userData = await requestPost('/login/validate', { token });
      if (userData.email !== email) {
        history.push('/');
      }
      const products = await requestData('/products');
      this.setState({
        products: [...products],
      });
    } catch (error) {
      history.push('/');
    }
  }

  render() {
    const { history } = this.props;
    const { products } = this.state;

    return (
      <div>
        <NavBar history={ history } />
        <ProductCard products={ products } />
      </div>
    );
  }
}

Customer.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, null)(Customer);