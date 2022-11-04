import propTypes from 'prop-types';
import React, { Component } from 'react';
import GenericText from './GenericText';
import GenericButton from './GenericButton';
import GenericInput from './GenericInput';

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
      <>
        { (cartP || products).map((product) => {
          const { id, name, url_image: urlImage, price } = product;
          return (
            <div key={ id }>
              <img
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ urlImage }
                alt={ name }
                width="50em"
              />
              <GenericText
                tag="p"
                datatestId={ `customer_products__element-card-title-${id}` }
                text={ name }
              />
              <GenericText
                tag="p"
                datatestId={ `customer_products__element-card-price-${id}` }
                text={ `Valor: R$ ${price.replace('.', ',')}` }
              />
              <GenericButton
                datatestId={ `customer_products__button-card-rm-item-${id}` }
                type="button"
                disabled={ !productValue[id] }
                onClick={ () => handleIncreaseDecrease(id, 'decrement') }
                text="-"
              />
              <GenericInput
                datatestId={ `customer_products__input-card-quantity-${id}` }
                type="text"
                name={ id }
                value={ productValue[id] || 0 }
                onChange={ handleChange }
              />
              <GenericButton
                datatestId={ `customer_products__button-card-add-item-${id}` }
                type="button"
                onClick={ () => handleIncreaseDecrease(id, 'increment') }
                text="+"
              />
            </div>
          );
        }) }
      </>
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
