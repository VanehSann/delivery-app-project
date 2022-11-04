import React, { Component } from 'react';
import propTypes from 'prop-types';
import { headOptionsCheckout } from '../utils';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/localStorage';
import { requestData, requestPost } from '../utils/axios';
import NavBar from '../components/NavBar';
import CheckoutTable from '../components/CheckoutTable';
import GenericText from '../components/GenericText';
import GenericSelect from '../components/GenericSelect';
import GenericInput from '../components/GenericInput';
import GenericButton from '../components/GenericButton';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      deliveryAddress: '',
      deliveryNumber: '',
      sellers: [],
      selectedSeller: '',
    };
  }

  async componentDidMount() {
    const storage = getFromLocalStorage('cart') || [];
    const resultSeller = await requestData('/admin/manage/sellers');

    this.setState({
      cart: storage,
      sellers: [...resultSeller],
      selectedSeller: resultSeller[0],
    });
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

  createSale = async () => {
    const { deliveryAddress, deliveryNumber, selectedSeller, cart } = this.state;
    const totalPrice = this.setCheckoutSum().replace(',', '.');

    const { token } = getFromLocalStorage('user') || {};
    const { id } = await requestPost('/login/validate', { token });
    const sellerId = selectedSeller.id;

    const pIds = cart.map((product) => ({ id: product.id, quantity: product.qty }));

    const saleBody = {
      id,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      pIds,
    };

    const result = await requestPost('/sales', saleBody);

    const { history } = this.props;
    history.push(`/customer/orders/${result.id}`);
  };

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    const { cart, deliveryAddress, deliveryNumber, selectedSeller, sellers } = this.state;
    const { history } = this.props;

    return (
      <div>
        <NavBar history={ history } />
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
        <GenericText
          tag="p"
          text="Detalhes e endereço de entrega"
        />
        <GenericSelect
          datatestId="customer_checkout__select-seller"
          name="selectedSeller"
          value={ selectedSeller }
          onChange={ this.handleChange }
          options={ sellers }
        />
        <GenericInput
          datatestId="customer_checkout__input-address"
          type="text"
          name="deliveryAddress"
          value={ deliveryAddress }
          onChange={ this.handleChange }
        />
        <GenericInput
          datatestId="customer_checkout__input-address-number"
          type="number"
          name="deliveryNumber"
          value={ deliveryNumber }
          onChange={ this.handleChange }
        />
        <GenericButton
          datatestId="customer_checkout__button-submit-order"
          type="button"
          onClick={ this.createSale }
          text="Finalizar Pedido"
        />
      </div>
    );
  }
}

Checkout.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
