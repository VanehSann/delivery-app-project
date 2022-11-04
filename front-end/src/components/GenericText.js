import React, { Component } from 'react';
import propTypes from 'prop-types';

class GenericText extends Component {
  render() {
    const { tag: Tag, datatestId, text } = this.props;
    return <Tag data-testid={ datatestId }>{ text }</Tag>;
  }
}

GenericText.propTypes = {
  tag: propTypes.string.isRequired,
  datatestId: propTypes.string,
  text: propTypes.string.isRequired,
};

GenericText.defaultProps = {
  datatestId: null,
};

export default GenericText;
