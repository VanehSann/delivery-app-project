import React, { Component } from 'react';
import propTypes from 'prop-types';

class GenericButton extends Component {
  render() {
    const { datatestId, type, disabled, onClick, text } = this.props;
    return (
      <button
        data-testid={ datatestId }
        type={ type === 'submit' ? 'submit' : 'button' }
        disabled={ disabled }
        onClick={ onClick }
      >
        { text }
      </button>
    );
  }
}

GenericButton.propTypes = {
  datatestId: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  disabled: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
};

export default GenericButton;
