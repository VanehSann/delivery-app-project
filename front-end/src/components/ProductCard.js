import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductCard extends Component {
  render() {
    const { products } = this.props;

    return (
      <div>
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
              { product.price }
            </p>
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              onChange={ this.handleChange }
            >
              -
            </button>
            <input
              type="number"
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              onChange={ this.handleChange }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
              onChange={ this.handleChange }
            >
              +
            </button>
          </div>
        )) }
      </div>
    );
  }
}

ProductCard.propTypes = {
  products: propTypes.shape.isRequired,
};

export default connect(null, null)(ProductCard);
