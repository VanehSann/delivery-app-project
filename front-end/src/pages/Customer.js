import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductsCard';
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
      const prodQty = products.map((prod) => ({
        ...prod,
        qty: 0,
      }));
      this.setState({
        products: prodQty,

      });
    } catch (error) {
      history.push('/');
    }
  }

  increaseProduct = (id) => {
    const { products } = this.state;
    const findProducts = products.find((prod) => prod.id === id);
    findProducts.qty += 1;
    const indexEl = id - 1;
    console.log(indexEl, 'log indexEl');
    const newArray = [
      ...products.slice(0, indexEl), findProducts, ...products.slice(indexEl + 1),
    ];
    this.setState({
      products: newArray,
    });
  };

  decreaseProduct = (id) => {
    const { products } = this.state;
    const findP = products.find((prod) => prod.id === id);
    if (findP.qty !== 0) {
      findP.qty -= 1;
    }
    const indexEl = id - 1;
    console.log(indexEl, 'log indexEl');
    const newArray = [
      ...products.slice(0, indexEl), findP, ...products.slice(indexEl + 1),
    ];
    this.setState({
      products: newArray,
    });
  };

  render() {
    const { history } = this.props;
    const { products } = this.state;

    return (
      <div>
        <NavBar history={ history } />
        <ProductCard
          products={ products }
          increase={ this.increaseProduct }
          decrease={ this.decreaseProduct }
        />

        <div>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ this.logoutUser }
          >
            Ver Carrinho
          </button>
        </div>
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
