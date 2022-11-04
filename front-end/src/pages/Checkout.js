import React, { Component } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import { headOptionsCheckout } from '../utils';
import { getFromLocalStorage } from '../utils/localStorage';
import GenericText from '../components/GenericText';

class Checkout extends Component {
  setCheckoutSum = () => {
    const storage = getFromLocalStorage('cart') || [];
    const totalReduce = storage
      .reduce((acc, curr) => Number((acc + curr.total)), 0);
    return totalReduce.toFixed(2);
  };

  render() {
    return (
      <div>
        <CheckoutTable
          headOptions={ headOptionsCheckout }
          data={ getFromLocalStorage('cart') || [] }
          deleteItem={ () => console.log('oi') }
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
