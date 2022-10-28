import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { state } = this.props;

    return (
      <div>
        <nav>
          <div>
            <h1
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </h1>
            <h1
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus Pedidos
            </h1>
            <h1
              data-testid="customer_products__element-navbar-user-full-name"
            >
              { state }
            </h1>
            <button
              data-testid="customer_products__element-navbar-link-logout"
              type="button"
            >
              Sair
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  state: userReducer.name,
});

Header.propTypes = {
  state: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
