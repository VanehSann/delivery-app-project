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
    // console.log(products);
    this.setState({
      products: [...products]
    })
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <NavBar />
        <div>
          <ul>
            { products.map((products, index) => {
              index !== 0 && (
                <section>
                  <li
                  data-testid={`customer_products__element-card-price-${products.id}`}
                  key={ index }>
                    <> { products.url_image } </>
                    <> { products.name } </>
                    <> { products.price } </>
                    <button
                    data-testid="button_add"
                    onChange={ this.handleChange }
                    > Adicionar ao Carrinho 
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
                    onChange={ this.handleChange }
                    > Remover do Carrinho 
                    </button>
                  </li>
                </section>
                )
            }) }
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Client);
