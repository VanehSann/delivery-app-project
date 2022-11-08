import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenericButton from './GenericButton';
import GenericText from './GenericText';

class NavBar extends Component {
  logoutUser = () => {
    const { history } = this.props;
    localStorage.removeItem('user');
    history.push('/');
  };

  render() {
    const { userName, history } = this.props;
    const { pathname } = window.location;

    return (
      <nav>
        { !pathname.includes('seller')
        && (<GenericButton
          datatestId="customer_products__element-navbar-link-products"
          type="button"
          onClick={ () => history.push('/customer/products') }
          text="Produtos"
        />) }
        <GenericButton
          datatestId="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ () => history.push('/customer/orders') }
          text={ !pathname.includes('seller') ? 'Meus Pedidos' : 'Pedidos' }
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
