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
  id: propTypes.string,
  datatestId: propTypes.string.isRequired,
  placeholder: propTypes.string,
  type: propTypes.string.isRequired,
  name: (propTypes.string || propTypes.number).isRequired,
  value: (propTypes.string || propTypes.number).isRequired,
  onChange: propTypes.func.isRequired,
};

GenericInput.defaultProps = {
  id: null,
  placeholder: null,
};

export default GenericInput;
