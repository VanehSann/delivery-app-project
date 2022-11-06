import propTypes from 'prop-types';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
// import { requestPost, setTokenInHeaders } from '../utils/axios';
// import { getFromLocalStorage } from '../utils/localStorage';

class CustomerOrders extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     sales: [],
  //   };
  // }

  // async componentDidMount() {
  //   const { history } = this.props;

  //   try {
  //     const { token } = getFromLocalStorage('user') || {};

  //     const userData = await requestPost('/login/validate', { token });

  //     setTokenInHeaders(token);

  //     if (userData.role !== 'customer') {
  //       history.push('/');
  //     }
  //     const results = await requestData('/customer/orders');

  //     this.setState({
  //       sales: [...results],
  //     });
  //   } catch (error) {
  //     history.push('/');
  //   }
  // }

  render() {
    const { history } = this.props;
    // const { sales } = this.state;

    return (
      <>
        <NavBar history={ history } />

        {/* {sales && sales.map((order, index) => (
          <Link
            to={ `/customer/orders/${order.id}` }
            key={ index }
            id={ order.id }
          >
            <div key={ index }>
              <span data-testid={ `customer_orders__element-order-id-${order.id}` }>
                {order.id}
              </span>
              <span
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              >
                {order.status}
              </span>
              <span data-testid={ `customer_orders__element-order-date-${order.id}` }>
                {order.saleDate}
              </span>
              <span data-testid={ `customer_orders__element-card-price-${order.id}` }>
                {order.totalPrice}
              </span>
            </div>
          </Link>
        ))} */}
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
