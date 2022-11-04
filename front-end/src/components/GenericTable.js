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
          { headOptions.map(((hOp) => (
            <tr key={ hOp }>
              <GenericText
                tag="th"
                text={ hOp }
              />
            </tr>
          ))) }
        </thead>
        <tbody>
          { data.map(({ id, name, email, role }, index) => (
            <tr key={ `d-${index}` }>
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-item-number-${index}` }
                text={ (index + 1).toString() }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-name-${index}` }
                text={ name }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-email-${index}` }
                text={ email }
              />
              <GenericText
                tag="th"
                datatestId={ `admin_manage__element-user-table-role-${index}` }
                text={ role }
              />
              <GenericText tag="th">
                <GenericButton
                  datatestId={ `admin_manage__element-user-table-remove-${index}` }
                  type="button"
                  onClick={ () => deleteUser(id) }
                  text="X"
                />
              </GenericText>
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
