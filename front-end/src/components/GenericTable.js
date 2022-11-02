import React, { Component } from 'react';
import propTypes from 'prop-types';
import GenericText from './GenericText';
import GenericButton from './GenericButton';

class GenericTable extends Component {
  render() {
    const { headOptions, data, deleteUser } = this.props;
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
                datatestId={ `admin_manage__element-user-table-name-${index}` }
                text={ d.name }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-email-${index}` }
                text={ d.email }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-role-${index}` }
                text={ d.role }
              />
              <th>
                <GenericButton
                  datatestId={ `admin_manage__element-user-table-remove-${index}` }
                  type="button"
                  onClick={ () => deleteUser(d.id) }
                  text="X"
                />
              </th>
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
  deleteUser: propTypes.func.isRequired,
};

export default GenericTable;
