import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import GenericText from './GenericText';
import GenericButton from './GenericButton';

class NavBar extends Component {
  logoutUser = () => {
    const { history } = this.props;
    localStorage.removeItem('user');
    history.push('/');
  };

  render() {
    const { userName } = this.props;

    return (
      <nav>
        <GenericText
          tag="h1"
          datatestId="customer_products__element-navbar-link-products"
          text="Produtos"
        />
        <GenericText
          tag="h1"
          datatestId="customer_products__element-navbar-link-orders"
          text="Meus Pedidos"
        />
        <GenericText
          tag="h1"
          datatestId="customer_products__element-navbar-user-full-name"
          text={ userName }
        />
        <GenericButton
          datatestId="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ this.logoutUser }
          text="Sair"
        />
      </nav>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  userName: userReducer.name,
});

NavBar.propTypes = {
  userName: propTypes.string.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(NavBar);
