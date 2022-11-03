import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductCard extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     inputValue: '',
  //   };
  // }

  // handleChange = ({ target }) => {
  //   const { name, inputValue } = target;
  //   this.setState({
  //     [name]: inputValue,
  //   });
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
    const { cartProducts,
      products,
      increase,
      decrease,
      handleChange,
      values,
      teste,
    } = this.props;

    // console.log(values);

    return (
      <div>
        <form>
          {/* onSubmit={ this.handleSubmit } */}
          { (cartProducts || products).map((product) => (
          // {
            // const productsCart = cart?.find((c) => c.id === product.id);
            // return
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
                // value={ contador }
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
                // value={ contador }
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

const mapStateToProps = (globalState) => ({
  addProduct: globalState.sizeButtons.addProduct,
});

ProductCard.propTypes = {
  products: propTypes.arrayOf(propTypes.shape).isRequired,
  increase: propTypes.func.isRequired,
  decrease: propTypes.func.isRequired,
  cartProducts: propTypes.arrayOf(propTypes.shape).isRequired,
  // setAddProduct: propTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(ProductCard);
