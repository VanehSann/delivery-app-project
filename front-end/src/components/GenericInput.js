import React, { Component } from 'react';
import propTypes from 'prop-types';

class GenericInput extends Component {
  render() {
    const { id, datatestId, placeholder, type, name, value, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        <input
          id={ id }
          data-testid={ datatestId }
          placeholder={ placeholder }
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

GenericInput.propTypes = {
  id: propTypes.string.isRequired,
  datatestId: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default GenericInput;
