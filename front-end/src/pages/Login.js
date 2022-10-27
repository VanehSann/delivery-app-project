import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userLogin } from '../redux/actions/user';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      role: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const PASSWORD_MAX_LENGTH = 6;
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      if (this.validateEmail(email) && password.length >= PASSWORD_MAX_LENGTH) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  };

  validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { history, dispatchLoginChange } = this.props;
    const { email, role } = this.state;

    dispatchLoginChange(email, role);

    history.push('/customer/products');
    // Adicionar switch/case para roles customer, seller e admin.
  };

  redirectToRegister = () => {
    const { history } = this.props;
    history.push('/register');
  };

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <fieldset>
        <p>Login</p>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="input-email">
            <input
              id="input-email"
              data-testid="common_login__input-email"
              placeholder="Insira seu e-mail"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-password">
            <input
              id="input-password"
              data-testid="common_login__input-password"
              placeholder="Insira sua senha"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="common_login__button-login"
            type="submit"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ this.redirectToRegister }
        >
          Registrar
        </button>
        <span data-testid="common_login__element-invalid-email">
          Elemento oculto - Mensagens de erro pra email invalido
        </span>
      </fieldset>
    );
  }
}

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginChange: (email, role) => dispatch(userLogin(email, role)),
});

Login.propTypes = {
  dispatchLoginChange: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
