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
  disabled: propTypes.bool,
  onClick: propTypes.func,
  text: propTypes.oneOfType([
    propTypes.string,
    propTypes.shape(),
  ]).isRequired,
};

GenericButton.defaultProps = {
  disabled: null,
  onClick: null,
};

export default GenericButton;
