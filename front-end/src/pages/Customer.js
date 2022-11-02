import React, { Component } from 'react';
import propTypes from 'prop-types';
import { requestData, requestPost } from '../utils/axios';
import { getFromLocalStorage } from '../utils/localStorage';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import GenericButton from '../components/GenericButton';

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
    const { products } = this.state;
    const { history } = this.props;

    return (
      <>
        <NavBar history={ history } />
        <ProductCard products={ products } />
        <GenericButton
          datatestId="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => console.log('Ainda não implementado') }
          text="Ver Carrinho"
        />
      </>
    );
  }
}

Customer.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Customer;
