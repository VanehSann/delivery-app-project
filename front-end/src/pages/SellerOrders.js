import propTypes from 'prop-types';
import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import { requestPost, setTokenInHeaders } from '../utils/axios';
import { getFromLocalStorage } from '../utils/localStorage';

class SellerOrders extends Component {
  constructor() {
    super();

    this.state = {
      sales: [],
    };
  }

  async componentDidMount() {
    // const { history } = this.props;

    try {
      const { token } = getFromLocalStorage('user') || {};

      const { id, role } = await requestPost('/login/validate', { token });

      setTokenInHeaders(token);

      // if (role !== 'seller') {
      //   history.push('/');
      // }
      const results = await requestPost('/seller/orders', { id, role });

      this.setState({
        sales: [...results],
      });
    } catch (error) {
      console.log(error);
      // history.push('/');
    }
  }

  render() {
    const { history } = this.props;
    const { sales } = this.state;

    return (
      <>
        <NavBar history={ history } />
        { sales.map((order, index) => (
          <label key={ index } htmlFor={ order.id }>
            <div>
              <span data-testid={ `seller_orders__element-order-id-${order.id}` }>
                { order.id }
              </span>
              <span data-testid={ `seller_orders__element-delivery-status-${order.id}` }>
                { order.status }
              </span>
              <span data-testid={ `seller_orders__element-order-date-${order.id}` }>
                { order.saleDate }
              </span>
              <span data-testid={ `seller_orders__element-card-price-${order.id}` }>
                { order.totalPrice }
              </span>
              <span data-testid={ `seller_orders__element-card-address-${order.id}` }>
                { `${order.deliveryAddress}, ${order.deliveryNumber}` }
              </span>
            </div>
            <button
              type="button"
              onClick={ () => history.push(`/seller/orders/${order.id}`) }
              key={ index }
              id={ order.id }
            >
              Botão
            </button>
          </label>
        )) }
      </>
    );
  }
}

SellerOrders.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default SellerOrders;
