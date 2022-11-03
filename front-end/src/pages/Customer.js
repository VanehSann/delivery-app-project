import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductsCard';
import { requestData, requestPost } from '../utils/axios';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/localStorage';

class Customer extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      cartSum: 0,
      values: {},
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
      if (!getFromLocalStorage('cartProducts')) {
        setIntoLocalStorage('cartProducts', prodQty);
      }
      const storage = getFromLocalStorage('cart') || [];
      const totalReduce = storage
        .reduce((acc, curr) => Number((acc + curr.total).toFixed(2)), 0);
      this.setState({
        cartSum: totalReduce,
      });
    } catch (error) {
      history.push('/');
    }
  }

  handleChange = ({ target }) => {
    console.log(target.value, 'log target');
    const { value, id } = target;
    const inputValue = value;
    this.increaseProduct(Number(id), Number(inputValue));
  };

  increaseProduct = (id, valueProduct) => {
    const storageProducts = getFromLocalStorage('cartProducts');
    const findProducts = storageProducts.find((prod) => prod.id === id);
    if (valueProduct) findProducts.qty = valueProduct;
    if (!valueProduct) findProducts.qty += 1;
    findProducts.total = Number((findProducts.qty * findProducts.price).toFixed(2));
    const indexEl = id - 1;
    const newArray = [
      ...storageProducts.slice(0, indexEl),
      findProducts, ...storageProducts.slice(indexEl + 1),
    ];
    setIntoLocalStorage('cartProducts', newArray);
    const storage = getFromLocalStorage('cart') || [];
    storage.push(findProducts);
    const filteredStorage = storage.filter((el) => el.id !== findProducts.id);
    setIntoLocalStorage('cart', [...filteredStorage, findProducts]);
    const storage2 = getFromLocalStorage('cart');
    const totalReduce = storage2
      .reduce((acc, curr) => Number((acc + curr.total).toFixed(2)), 0);
    const { values } = this.state;
    const testeArray = newArray.find((prod) => prod.id === id);
    this.setState({
      values: { ...values, [id]: testeArray.qty },
      // [id]: findProducts.qty,
      cartSum: totalReduce,
    }, () => {
      setIntoLocalStorage('values', values);
    });
  };

  decreaseProduct = (id) => {
    const storageProducts = getFromLocalStorage('cartProducts');
    const findProducts = storageProducts.find((prod) => prod.id === id);
    findProducts.qty -= 1;
    findProducts.total = Number((findProducts.qty * findProducts.price).toFixed(2));
    const indexEl = id - 1;
    const newArray = [
      ...storageProducts.slice(0, indexEl),
      findProducts, ...storageProducts.slice(indexEl + 1),
    ];
    setIntoLocalStorage('cartProducts', newArray);
    const storage = getFromLocalStorage('cart') || [];
    storage.push(findProducts);
    const filteredStorage = storage.filter((el) => el.id !== findProducts.id);
    setIntoLocalStorage('cart', [...filteredStorage, findProducts]);
    const storage2 = getFromLocalStorage('cart');
    const totalReduce = storage2
      .reduce((acc, curr) => Number((acc + curr.total).toFixed(2)), 0);
    this.setState({
      cartSum: totalReduce,
    });
    if (findProducts.qty === 0) {
      console.log(findProducts.qty, 'log findProducts linha 94');
      const removeObj = storage2.filter((el) => el.qty > 0);
      console.log(removeObj, 'log remove obj 97');
      setIntoLocalStorage('cart', removeObj);
    }
  };

  render() {
    const { history } = this.props;
    const { products, cartSum, values } = this.state;
    const storageReturn = getFromLocalStorage('cartProducts');
    const teste = getFromLocalStorage('values') || { ...values };

    return (
      <div>
        <NavBar history={ history } />
        <ProductCard
          cartProducts={ storageReturn }
          products={ products }
          increase={ this.increaseProduct }
          decrease={ this.decreaseProduct }
          handleChange={ this.handleChange }
          values={ values }
          teste={ teste }
        />

        <div>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ this.logoutUser }
          >
            Ver Carrinho
            <p data-testid="customer_products__checkout-bottom-value">{ cartSum }</p>
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
