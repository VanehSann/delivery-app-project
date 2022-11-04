import propTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    const {
      cartP,
      products,
      handleIncreaseDecrease,
      handleChange,
      productValue,
    } = this.props;

    return (
      <div>
        <form>
          { (cartP || products).map((product) => (
            <div key={ product.id }>
              <img
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.url_image }
                alt={ product.name }
                width="50em"
              />
              <p data-testid={ `customer_products__element-card-title-${product.id}` }>
                { product.name }
              </p>
              <p data-testid={ `customer_products__element-card-price-${product.id}` }>
                { `Valor: R$ ${product.price.replace('.', ',')}`}
              </p>
              <button
                data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                type="button"
                disabled={ !productValue[product.id] }
                onClick={ () => handleIncreaseDecrease(product.id, 'decrement') }
              >
                -
              </button>
              <input
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
                type="text"
                value={ productValue[product.id] || 0 }
                name={ product.id }
                onChange={ handleChange }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                type="button"
                onClick={ () => handleIncreaseDecrease(product.id, 'increment') }
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

ProductCard.propTypes = {
  products: propTypes.arrayOf(propTypes.shape).isRequired,
  handleIncreaseDecrease: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  productValue: propTypes.shape(),
  cartP: propTypes.arrayOf(propTypes.shape).isRequired,
};

ProductCard.defaultProps = {
  productValue: null,
};

export default ProductCard;
