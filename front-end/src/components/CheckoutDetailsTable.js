import React, { Component } from 'react';
import propTypes from 'prop-types';
import GenericText from './GenericText';

const dataTestIdTable = 'customer_order_details__element-order-table-';

class CheckoutDetailsTable extends Component {
  render() {
    const { headOptions, data } = this.props;

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
                datatestId={ `${dataTestIdTable}item-number-${i}` }
                text={ (i + 1).toString() }
              />
              <GenericText
                tag="th"
                datatestId={ `${dataTestIdTable}name-${i}` }
                text={ d.name }
              />
              <GenericText
                tag="th"
                datatestId={ `${dataTestIdTable}quantity-${i}` }
                text={ d.qty }
              />
              <GenericText
                tag="th"
                datatestId={ `${dataTestIdTable}unit-price-${i}` }
                text={ d.price.replace('.', ',') }
              />
              <GenericText
                tag="th"
                datatestId={ `${dataTestIdTable}sub-total-${i}` }
                text={ d.total.toFixed(2).replace('.', ',') }
              />
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

CheckoutDetailsTable.propTypes = {
  headOptions: propTypes.arrayOf(propTypes.string).isRequired,
  data: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default CheckoutDetailsTable;
