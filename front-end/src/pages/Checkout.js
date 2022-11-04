import React, { Component } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import { headOptionsCheckout } from '../utils';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/localStorage';
import GenericText from '../components/GenericText';
import GenericSelect from '../components/GenericSelect';
import GenericInput from '../components/GenericInput';
import GenericButton from '../components/GenericButton';
import { requestData, requestPost } from '../utils/axios';

class Checkout extends Component {
  constructor() {
    super();
    this.state = { cart: [],
      deliveryAddress: '',
      deliveryNumber: '',
      sellers: [],
      selectedSeller: '' };
  }

  async componentDidMount() {
    const storage = getFromLocalStorage('cart') || [];
    this.setState({ cart: storage });
    try {
      const resultSeller = await requestData('/admin/manage/sellers');
      this.setState({ sellers: [...resultSeller], selectedSeller: resultSeller[0] });
    } catch (error) {
      console.log(error);
    }
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
    const { deliveryAddress, deliveryNumber, selectedSeller } = this.state;
    const { token } = getFromLocalStorage('user') || {};

    try {
      const { id } = await requestPost('/login/validate', { token });
      const totalPrice = this.setCheckoutSum().replace(',', '.');
      const sellerId = selectedSeller.id;
      const { cart } = this.state;
      const pIds = cart.map((product) => ({ id: product.id, quantity: product.qty }));
      const saleBody = { id,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        pIds };
      await requestPost('/sales', saleBody);
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { cart, deliveryAddress, deliveryNumber, selectedSeller, sellers } = this.state;
    console.log(sellers);
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

export default Checkout;
