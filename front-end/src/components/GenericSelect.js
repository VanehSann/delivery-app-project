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
        { options.map((option, index) => (
          <option key={ `${option}-${index}` }>
            { typeof option === 'object' ? option.name : option }
          </option>
        )) }
      </select>
    );
  }
}

GenericSelect.propTypes = {
  datatestId: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.object,
  ]).isRequired,
  options: propTypes.arrayOf(propTypes.oneOfType([
    propTypes.string,
    propTypes.object,
  ])).isRequired,
};

export default GenericSelect;
