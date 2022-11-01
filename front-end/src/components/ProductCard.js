import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductCard extends Component {
  constructor() {
    super();

    this.state = {
      atualiza: false,
      contador: 0,
    };
  }

  // componentDidMount() {
  //   const { addProduct } = this.props;
  //   this.setState({ contador: addProduct.contador });
  // }

  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  increase = ({ target }) => {
    const { products } = this.props;
    console.log(products, 'products increase');
    // const { addProduct } = this.props;
    // addProduct.contador += 1;
    // this.setState({ contador: addProduct.contador });
    const { atualiza } = this.state;
    console.log(atualiza);
    this.setState({ atualiza: true }, () => {
      // const storage = products;
      // JSON.parse(localStorage.getItem('products'));
      // console.log(storage, 'log funcao increase');
      const addItens = products.find((item) => item.id === target.name);
      addItens.qtd += 1;
      localStorage.setItem('products', JSON.stringify(storage));
      this.setState({ atualiza: false });
    });
  };

  // decrease = () => {
  //   const { addProduct } = this.props;
  //   if (addProduct.contador > 0) {
  //     addProduct.contador -= 1;
  //     this.setState({ contador: addProduct.contador });
  //   }
  // };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { setAddProduct, addProduct } = this.props;
  //   const sizeProducts = addProduct[addProduct.length - 1];
  //   const id = !sizeProducts ? 0 : sizeProducts.id + 1;
  //   setAddProduct(this.state, id);
  //   this.setState({
  //     value: '',
  //   });
  // };

  render() {
    const { contador } = this.state;
    const { products } = this.props;
    // const products = JSON.parse(localStorage.getItem('products'));
    console.log(products, 'log funcao render');

    return (
      <div>
        <form>
          {/* onSubmit={ this.handleSubmit } */}
          { products.map((product) => (
            <div
              data-testid={ `customer_products__element-card-price-${product.id}` }
              key={ product.id }
            >
              <img
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.url_image }
                alt={ product.name }
                width="50em"
              />
              <p
                data-testid={ `customer_products__element-card-title-${product.id}` }
              >
                { product.name }
              </p>
              <p
                data-testid={ `customer_products__element-card-price-${product.id}` }
              >
                { `Valor: ${product.price.replace('.', ',')}`}
              </p>
              <button
                type="button"
                name="down"
                value={ contador }
                data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                onClick={ this.decrease }
              >
                -
              </button>
              <input
                type="number"
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
                value={ contador }
                min={ 0 }
                // onChange={ this.handleChange }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                type="button"
                name="up"
                value={ contador }
                onClick={ this.increase }
              >
                +
              </button>
            </div>
          )) }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  addProduct: globalState.sizeButtons.addProduct,
});

ProductCard.propTypes = {
  products: propTypes.arrayOf(propTypes.shape).isRequired,
// addProduct: propTypes.shape.isRequired,
// setAddProduct: propTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(ProductCard);
