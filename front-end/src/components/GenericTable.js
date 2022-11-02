import React, { Component } from 'react';
import propTypes from 'prop-types';
import GenericText from './GenericText';

class GenericTable extends Component {
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
          { data.map((d, index) => (
            <tr key={ `d-${index}` }>
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-item-number-${index}` }
                text={ (index + 1).toString() }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-item-name-${index}` }
                text={ d.name }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-item-email-${index}` }
                text={ d.email }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-item-role-${index}` }
                text={ d.role }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-item-remove-${index}` }
                text="X"
              />
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

GenericTable.propTypes = {
  headOptions: propTypes.arrayOf(propTypes.string).isRequired,
  data: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default GenericTable;
