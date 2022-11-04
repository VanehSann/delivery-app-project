import React, { Component } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import { headOptionsCheckout } from '../utils';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/localStorage';
import GenericText from '../components/GenericText';

class Checkout extends Component {
  constructor() {
    super();
    this.state = { cart: [] };
  }

  componentDidMount() {
    const storage = getFromLocalStorage('cart') || [];
    this.setState({ cart: storage });
  }

  setCheckoutSum = () => {
    const { cart } = this.state;
    const totalReduce = cart
      .reduce((acc, curr) => Number((acc + curr.total)), 0);
    return totalReduce.toFixed(2).replace('.', ',');
  };

  removeItem = (id) => {
    const { cart } = this.state;
    const filterCart = cart.filter((el) => el.id !== id);
    setIntoLocalStorage('cart', filterCart);
    this.setState({ cart: filterCart });
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        <CheckoutTable
          headOptions={ headOptionsCheckout }
          data={ cart }
          deleteItem={ this.removeItem }
        />
        <GenericText
          tag="p"
          datatestId="customer_checkout__element-order-total-price"
          text={ `Total: ${this.setCheckoutSum()}` }
        />
      </div>
    );
  }
}

export default Checkout;
