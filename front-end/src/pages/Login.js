import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userLogin } from '../redux/actions/user';
import { requestPost } from '../utils/axios';
import { setIntoLocalStorage } from '../utils/localStorage';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      errorHandling: false,
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

  handleSubmit = async (event) => {
    event.preventDefault();

    const { history, dispatchLoginChange } = this.props;
    const { email, password } = this.state;

    try {
      const { name, role, token } = await requestPost('/login', { email, password });

      dispatchLoginChange(name, email, role);

      this.setState({
        errorHandling: false,
      });

      setIntoLocalStorage('user', { name, email, role, token });

      switch (role) {
      case 'administrator':
        history.push('/admin/manage');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      default:
        history.push('/customer/products');
      }
    } catch (error) {
      this.setState({
        errorHandling: true,
      });
    }
  };

  redirectToRegister = () => {
    const { history } = this.props;
    history.push('/register');
  };

  render() {
    const { email, password, isDisabled, errorHandling } = this.state;

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
        { errorHandling && (
          <span data-testid="common_login__element-invalid-email">
            DADOS INVÁLIDOS PARA LOGIN
          </span>
        ) }

      </fieldset>
    );
  }
}

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginChange: (name, email, role) => dispatch(userLogin(name, email, role)),
});

Login.propTypes = {
  dispatchLoginChange: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
