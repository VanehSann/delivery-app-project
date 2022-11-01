import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../redux/actions/user';
import { requestPost, setToken } from '../utils/axios';
import { setIntoLocalStorage } from '../utils/localStorage';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
      password: '',
      isDisabled: true,
      errorHandling: false,
    };
  }

  handleChange = ({ target }) => {
    const PASSWORD_MAX_LENGTH = 6;
    const NAME_MIN_LENGTH = 12;

    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { userName, userEmail, password } = this.state;
      if (this.validateEmail(userEmail)
       && password.length >= PASSWORD_MAX_LENGTH
       && userName.length >= NAME_MIN_LENGTH) {
        this.setState({
          isDisabled: false,
          errorHandling: false,
        });
      } else {
        this.setState({
          isDisabled: true,
          errorHandling: true,
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

    const { history, dispatchRegisterChange } = this.props;
    const { userName, userEmail, password } = this.state;

    try {
      const { name, email, role, token } = await requestPost('/register', {
        name: userName,
        email: userEmail,
        password,
        role: 'customer' });

      setIntoLocalStorage('user', { name, email, role, token });
      setToken(token);

      dispatchRegisterChange({
        name: userName,
        userEmail,
        role: 'customer' });

      this.setState({
        errorHandling: false,
      });

      history.push('/customer/products');
    } catch (error) {
      this.setState({
        errorHandling: true,
      });
    }
  };

  render() {
    const { userEmail, password, isDisabled, errorHandling, userName } = this.state;

    return (
      <fieldset>
        <p>Cadastro</p>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="input-name">
            <input
              id="input-name"
              data-testid="common_register__input-name"
              placeholder="Insira seu nome"
              type="text"
              name="userName"
              value={ userName }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            <input
              id="input-email"
              data-testid="common_register__input-email"
              placeholder="Insira seu e-mail"
              type="email"
              name="userEmail"
              value={ userEmail }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-password">
            <input
              id="input-password"
              data-testid="common_register__input-password"
              placeholder="Insira sua senha"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="common_register__button-register"
            type="submit"
            disabled={ isDisabled }
          >
            Cadastrar
          </button>
        </form>
        { errorHandling && (
          <span data-testid="common_register__element-invalid_register">
            DADOS INVÁLIDOS PARA CADASTRO
          </span>
        ) }
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRegisterChange: (body) => dispatch(userRegister(body)),
});

Register.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatchRegisterChange: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Register);
