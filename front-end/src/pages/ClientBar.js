import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { requestData } from '../utils/axios';

class Client extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const products = await requestData('/products');
    this.setState({
      products: [...products],
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <NavBar />
        <div>
          <ul>
            { products.map((product, index) => (
              <li
                data-testid={ `customer_products__element-card-price-${product.id}` }
                key={ index }
              >
                <img src={ product.url_image } alt={ product.name } width="50em" />
                <p>{ product.name }</p>
                <p>{ product.price }</p>
                <button
                  data-testid="button_add"
                  type="button"
                  onChange={ this.handleChange }
                >
                  Adicionar ao Carrinho
                </button>
                <input
                  data-testid="button_remove"
                  placeholder="0"
                  type="text"
                  name="text"
                  onChange={ this.handleChange }
                />
                <button
                  data-testid=""
                  type="button"
                  onChange={ this.handleChange }
                >
                  Remover do Carrinho
                </button>
              </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Client);
