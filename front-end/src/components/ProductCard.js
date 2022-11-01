import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductCard extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { setAddProduct, addProduct } = this.props;
    const sizeProducts = addProduct[addProduct.length - 1];
    const id = !sizeProducts ? 0 : sizeProducts.id + 1;
    setAddProduct(this.state, id);
    this.setState({
      value: '', description: '',
    });
  };

  render() {
    const { products, value } = this.props;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
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
                { product.price.replace('.', ',') }
              </p>
              <button
                type="button"
                name="down"
                value={ value }
                data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                onChange={ this.handleChange }
              >
                -
              </button>
              <input
                type="number"
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
                defaultValue={ 0 }
                min={ 0 }
                onChange={ this.handleChange }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                type="button"
                name="up"
                value={ value }
                onChange={ this.handleChange }
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
  qtyProduct: globalState.sizeButtons.addProduct,
});

ProductCard.propTypes = {
  products: propTypes.arrayOf(propTypes.shape).isRequired,
  setAddProduct: propTypes.func.isRequired,
  addProduct: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(ProductCard);
