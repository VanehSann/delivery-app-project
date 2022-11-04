import React, { Component } from 'react';
import propTypes from 'prop-types';

class GenericSelect extends Component {
  render() {
    const { datatestId, name, value, onChange, options } = this.props;
    return (
      <select
        data-testid={ datatestId }
        name={ name }
        value={ value }
        onChange={ onChange }
      >
        { options.map((option) => <option key={ option }>{ option }</option>) }
      </select>
    );
  }
}

GenericSelect.propTypes = {
  datatestId: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  options: propTypes.arrayOf(propTypes.string).isRequired,
};

export default GenericSelect;
