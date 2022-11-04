import propTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    const { cartProducts,
      products,
      increase,
      decrease,
      // handleChange,
      // values,
      // teste,
    } = this.props;

    return (
      <div>
        <form>
          { (cartProducts || products).map((product) => (
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
                disabled={ !values[product.id] }
                data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                onClick={ () => decrease(product.id) }
              >
                -
              </button>
              <input
                type="text"
                data-testid={ `customer_products__input-card-quantity-${product.id}` }
                value={ values[product.id] }
                name={ `${product.id}` }
                id={ product.id }
                min={ 0 }
                defaultValue={ 0 }
                onChange={ handleChange }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                type="button"
                name="up"
                onClick={ () => increase(product.id) }
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
  increase: propTypes.func.isRequired,
  decrease: propTypes.func.isRequired,
  cartProducts: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default ProductCard;
