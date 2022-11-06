import propTypes from 'prop-types';
import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import { requestPost, requestPut, setTokenInHeaders } from '../utils/axios';
import { getFromLocalStorage } from '../utils/localStorage';

const dataTestId = 'customer_order_details__element-order-details-label-';
const dataTestIdTable = 'customer_order_details__element-order-table-';

class CustomerOrdersDetails extends Component {
  constructor() {
    super();

    this.state = {
      sales: [],
      saleInfo: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    try {
      const { token } = getFromLocalStorage('user') || {};

      const userData = await requestPost('/login/validate', { token });

      setTokenInHeaders(token);

      if (userData.role !== 'customer') {
        history.push('/');
      }
      const results = await requestData('/customer/orders');
      const resultsById = await requestData(`/customer/orders/${id}`);

      this.setState({
        sales: [...results],
        saleInfo: [...resultsById],
      });
    } catch (error) {
      history.push('/');
    }
  }

  // async updateStatus(newStatus) {
  //   await requestPut('customer/orders/:id', newStatus);
  // }

  render() {
    const { history, id } = this.props;
    const { sales, saleInfo } = this.state;

    return (
      <>
        <NavBar history={ history } />

        <h2>Detalhe do Pedido</h2>
        {sales[0].id
         && sales.filter((sale) => sale.id === Number(id)).map((order, index) => (
           <div key={ index }>
             <span
               data-testid={ `${dataTestId}order-id` }
             >
               {order.id}
             </span>
             <span
               data-testid={ `${dataTestId}seller-name` }
             >
               { `P. Vendedora: ${order.sellerName}` }
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
                   'customer/orders/:id',
                   { status: 'Entregue' },
                 );
                 return result;
               } }
               disabled={ !order.status.includes('Pendente') }
               data-testid="customer_order_details__button-delivery-check"
             >
               Marcar como entregue
             </button>
             <table>
               {saleInfo[0].name && saleInfo.map((item, indexSaleInfo) => (

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
               data-testid="customer_order_details__element-order-total-price"
             >
               { order.totalPrice }
             </span>
           </div>

         ))}
      </>
    );
  }
}

CustomerOrdersDetails.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  id: propTypes.string.isRequired,
};

export default CustomerOrdersDetails;
