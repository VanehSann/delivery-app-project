import propTypes from 'prop-types';
import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import { requestPost, setTokenInHeaders } from '../utils/axios';
import { getFromLocalStorage } from '../utils/localStorage';

class CustomerOrders extends Component {
  constructor() {
    super();

    this.state = {
      sales: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    try {
      const { token } = getFromLocalStorage('user') || {};

      const { id, role } = await requestPost('/login/validate', { token });

      setTokenInHeaders(token);

      const results = await requestPost('/customer/orders', { id, role });

      this.setState({
        sales: [...results],
      });
    } catch (error) {
      console.log(error);
      history.push('/');
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
              <span data-testid={ `customer_orders__element-order-id-${order.id}` }>
                { order.id }
              </span>
              <span
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              >
                { order.status }
              </span>
              <span data-testid={ `customer_orders__element-order-date-${order.id}` }>
                { new Date(order.saleDate).toLocaleDateString('pt-BR') }
              </span>
              <span data-testid={ `customer_orders__element-card-price-${order.id}` }>
                { order.totalPrice.replace('.', ',') }
              </span>
            </div>
            <button
              type="button"
              onClick={ () => history.push(`/customer/orders/${order.id}`) }
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

CustomerOrders.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default CustomerOrders;
