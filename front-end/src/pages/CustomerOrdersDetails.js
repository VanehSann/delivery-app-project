import propTypes from 'prop-types';
import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import { requestData, requestPost, requestPut, setTokenInHeaders } from '../utils/axios';
import { getFromLocalStorage } from '../utils/localStorage';
import CheckoutDetailsTable from '../components/CheckoutDetailsTable';
import { headOptionsCheckout2 } from '../utils';

const dataTestId = 'customer_order_details__element-order-details-label-';

class CustomerOrdersDetails extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
      saleInfo: {},
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const saleId = history.location.pathname.split('/customer/orders/')[1];

    try {
      const { token } = getFromLocalStorage('user') || {};

      await requestPost('/login/validate', { token });

      setTokenInHeaders(token);

      const storage = getFromLocalStorage('cart') || [];

      const resultsById = await requestData(`/customer/orders/${saleId}`);

      this.setState({
        cart: storage,
        saleInfo: resultsById,
      });
    } catch (error) {
      console.log(error);
      history.push('/');
    }
  }

  setCheckoutSum = () => {
    const { cart } = this.state;
    const totalReduce = cart
      .reduce((acc, curr) => Number((acc + curr.total)), 0);
    return totalReduce.toFixed(2).replace('.', ',');
  };

  // async updateStatus(newStatus) {
  //   await requestPut('customer/orders/:id', newStatus);
  // }

  render() {
    const { history } = this.props;
    const { cart, saleInfo } = this.state;
    const saleId = history.location.pathname.split('/customer/orders/')[1];
    const date = new Date(saleInfo.saleDate).toLocaleDateString('pt-BR');

    return (
      <>
        <NavBar history={ history } />
        <h2>Detalhe do Pedido</h2>
        <div key={ saleInfo.id }>
          <span
            data-testid={ `${dataTestId}order-id` }
          >
            { saleInfo.id }
          </span>
          <span
            data-testid={ `${dataTestId}seller-name` }
          >
            { `P. Vendedora: ${saleInfo.sellerName}` }
          </span>
          <span
            data-testid={ `${dataTestId}delivery-status` }
          >
            { saleInfo.status }
          </span>
          <span
            data-testid={ `${dataTestId}order-date` }
          >
            { date }
          </span>

          <button
            type="button"
            onClick={ async () => {
              const result = await requestPut(
                `customer/orders/${saleId}`,
                { status: 'Entregue' },
              );
              return result;
            } }
            disabled={ saleInfo.status !== 'Em Trânsito' }
            data-testid="customer_order_details__button-delivery-check"
          >
            Marcar como entregue
          </button>
          <CheckoutDetailsTable
            headOptions={ headOptionsCheckout2 }
            data={ cart }
          />
          <span
            data-testid="customer_order_details__element-order-total-price"
          >
            { `Total: R$ ${this.setCheckoutSum()}` }
          </span>
        </div>
      </>
    );
  }
}

CustomerOrdersDetails.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrdersDetails;
