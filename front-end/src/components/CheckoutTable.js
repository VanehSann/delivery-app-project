import React, { Component } from 'react';
import propTypes from 'prop-types';
import GenericText from './GenericText';
import GenericButton from './GenericButton';

class CheckoutTable extends Component {
  render() {
    const { headOptions, data, deleteItem } = this.props;
    return (
      <table>
        <thead>
          <tr>
            { headOptions.map(((hOp) => (
              <th key={ hOp }>{ hOp }</th>
            ))) }
          </tr>
        </thead>
        <tbody>
          { data.map((d, i) => (
            <tr key={ `d-${i}` }>
              <GenericText
                tag="th"
                datatestId={ `customer_checkout__element-order-table-item-number-${i}` }
                text={ (i + 1).toString() }
              />
              <GenericText
                tag="th"
                datatestId={ `customer_checkout__element-order-table-name-${i}` }
                text={ d.name }
              />
              <GenericText
                tag="th"
                datatestId={ `customer_checkout__element-order-table-quantity-${i}` }
                text={ d.qty }
              />
              <GenericText
                tag="th"
                datatestId={ `customer_checkout__element-order-table-unit-price-${i}` }
                text={ d.price.replace('.', ',') }
              />
              <GenericText
                tag="th"
                datatestId={ `customer_checkout__element-order-table-sub-total-${i}` }
                text={ d.total.toFixed(2).replace('.', ',') }
              />
              <th>
                <GenericButton
                  datatestId={ `customer_checkout__element-order-table-remove-${i}` }
                  type="button"
                  onClick={ () => deleteItem(d.id) }
                  text="Remover"
                />
              </th>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

CheckoutTable.propTypes = {
  headOptions: propTypes.arrayOf(propTypes.string).isRequired,
  data: propTypes.arrayOf(propTypes.shape).isRequired,
  deleteItem: propTypes.func.isRequired,
};

export default CheckoutTable;
