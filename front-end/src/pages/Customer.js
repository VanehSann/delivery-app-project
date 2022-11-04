import React, { Component } from 'react';
import propTypes from 'prop-types';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductsCard';
import { requestData, requestPost } from '../utils/axios';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/localStorage';
import GenericButton from '../components/GenericButton';

class Customer extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      checkoutSum: 0,
      productValue: {},
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
      const prodQty = products.map((prod) => ({ ...prod, qty: 0 }));
      this.setState({ products: prodQty });

      if (!getFromLocalStorage('cartP')) setIntoLocalStorage('cartP', prodQty);

      this.setCheckoutSum();
    } catch (error) {
      history.push('/');
    }
  }

  setCheckoutSum = () => {
    const storage = getFromLocalStorage('cart') || [];
    const totalReduce = storage
      .reduce((acc, curr) => Number((acc + curr.total)), 0);
    this.setState({ checkoutSum: totalReduce });
  };

  createCart = (product) => {
    const cart = getFromLocalStorage('cart') || [];
    cart.push(product);
    const filteredStorage = cart.filter((el) => el.id !== product.id);
    setIntoLocalStorage('cart', [...filteredStorage, product]);

    if (product.qty === 0) {
      const updatedCart = getFromLocalStorage('cart');
      setIntoLocalStorage('cart', updatedCart.filter((el) => el.qty > 0));
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.handleIncreaseDecrease(Number(name), null, Number(value));
  };

  handleIncreaseDecrease = (id, status, valueProduct) => {
    const indexEl = id - 1;
    const products = getFromLocalStorage('cartP');
    const findP = products.find((prod) => prod.id === id);

    if (valueProduct) findP.qty = valueProduct;
    if (!valueProduct && status === 'increment') findP.qty += 1;
    if (!valueProduct && status === 'decrement') findP.qty -= 1;

    findP.total = Number((findP.qty * findP.price));

    const productsArray = [
      ...products.slice(0, indexEl), findP, ...products.slice(indexEl + 1),
    ];
    setIntoLocalStorage('cartP', productsArray);

    this.createCart(findP);

    this.setCheckoutSum();

    const { productValue } = this.state;

    this.setState({ productValue: { ...productValue, [id]: findP.qty } }, () => {
      const { productValue: pValue } = this.state;
      setIntoLocalStorage('productValue', pValue);
    });
  };

  logoutUser = () => {
    const { history } = this.props;
    history.push('/customer/checkout');
  };

  render() {
    const { products, checkoutSum, productValue } = this.state;
    const { history } = this.props;

    return (
      <>
        <NavBar history={ history } />
        <ProductCard
          cartP={ getFromLocalStorage('cartP') }
          products={ products }
          handleIncreaseDecrease={ this.handleIncreaseDecrease }
          handleChange={ this.handleChange }
          productValue={ productValue }
        />
        <GenericButton
          datatestId="customer_products__button-cart"
          type="button"
          disabled={ checkoutSum === 0 }
          onClick={ this.logoutUser }
          text={ (
            <p data-testid="customer_products__checkout-bottom-value">
              { `Ver Carrinho ${checkoutSum.toFixed(2).toString().replace('.', ',')}` }
            </p>) }
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
