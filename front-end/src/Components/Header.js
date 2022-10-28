import React from "react";
import { connect } from 'react-redux';
import propTypes from 'prop-types';


class Header extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  render() {
    const { state } = this.props;
    return (
      <>
        <header data-testid = "">
          <div>
            <h1 data-testid = "" >Products</h1>
            <h1 data-testid = "" >Meus Pedidos</h1>
            <h1 data-testid = "" >{ state }</h1>
            <button data-testid = "" > Sair </button>
          </div>
        </header>
      </>
    );
  }
}

  const mapStateToProps = (userLogin) => ({
    state: userLogin.name
  });

  Header.propTypes = {
    state: propTypes.string.isRequired,
  };


export default connect(mapStateToProps, null)(Header);