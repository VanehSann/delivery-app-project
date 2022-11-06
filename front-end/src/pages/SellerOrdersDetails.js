import propTypes from 'prop-types';
import React, { Component } from 'react';
// import NavBar from '../components/NavBar';
// import { requestPost, requestPut, setTokenInHeaders } from '../utils/axios';
// import { getFromLocalStorage } from '../utils/localStorage';

// const dataTestId = 'seller_order_details__element-order-details-label-';
// const dataTestIdTable = 'seller_order_details__element-order-table-';

class SellerOrdersDetails extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     sales: [],
  //     saleInfo: [],
  //   };
  // }

  // async componentDidMount() {
  //   const { history } = this.props;

  //   try {
  //     const { token } = getFromLocalStorage('user') || {};

  //     const userData = await requestPost('/login/validate', { token });

  //     setTokenInHeaders(token);

  //     if (userData.role !== 'seller') {
  //       history.push('/');
  //     }
  //     const results = await requestData('/seller/orders');
  //     const resultsById = await requestData(`/seller/orders/${id}`);

  //     this.setState({
  //       sales: [...results],
  //       saleInfo: [...resultsById],
  //     });
  //   } catch (error) {
  //     history.push('/');
  //   }
  // }

  // async updateStatus(newStatus) {
  //   await requestPut('seller/orders/:id', newStatus);
  // }

  render() {
    // const { history, id } = this.props;
    // const { sales, saleInfo } = this.state;
    // const id = window.location.pathname.replace('seller/orders/', '');

    return (
      <>
        {/* <NavBar history={ history } /> */}

        <h2>Detalhe do Pedido</h2>
        {/* {sales && sales.filter((sale) => sale.id === Number(id)).map((order, index) => (
          <div key={ index }>
            <span
              data-testid={ `${dataTestId}order-id` }
            >
              {order.id}
            </span>
            <span
              data-testid={ `${dataTestId}delivery-status` }
            >
              {order.status}
            </span>
            <span
              data-testid={ `${dataTestId}order-date` }
            >
              {order.saleDate}
            </span>

            <button
              type="button"
              onClick={ async () => {
                const result = await requestPut(
                  'seller/orders/:id',
                  { status: 'Preparando' },
                );
                return result;
              } }
              disabled={ !order.status.includes('Pendente') }
              data-testid="seller_order_details__button-preparing-check"
            >
              Preparar Pedido
            </button>
            <button
              onClick={ async () => requestPut(
                'seller/orders/:id',
                { status: 'Em Trãnsito' },
              ) }
              type="button"
              disabled={ !order.status.includes('Preparando') }
              data-testid="seller_order_details__button-dispatch-check"
            >
              Saiu Para Entrega
            </button>
            <table>
              {saleInfo && saleInfo.map((item, indexSaleInfo) => (

                <tbody key="index">
                  <tr>
                    <td
                      data-testid={ `${dataTestIdTable}item-number-${indexSaleInfo}` }
                    >
                      { indexSaleInfo }
                    </td>
                    <td
                      data-testid={ `${dataTestIdTable}name-${indexSaleInfo}` }
                    >
                      { item.name }
                    </td>
                    <td
                      data-testid={ `${dataTestIdTable}quantity-${indexSaleInfo}` }
                    >
                      { item.quantity }
                    </td>
                    <td
                      data-testid={ `${dataTestIdTable}unit-price-${indexSaleInfo}` }
                    >
                      { item.price }
                    </td>
                    <td
                      data-testid={ `${dataTestIdTable}sub-total-price` }
                    >
                      { Number(item.quantity) * Number(item.price) }
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <span
              data-testid="seller_order_details__element-order-total-price"
            >
              { order.totalPrice }
            </span>
          </div>

        ))} */}
      </>
    );
  }
}

SellerOrdersDetails.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  // id: propTypes.string.isRequired,
};

export default SellerOrdersDetails;
