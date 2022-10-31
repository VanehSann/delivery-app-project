import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../redux/actions/user';
import { requestRegister } from '../utils/axios';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
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
      const { username, email, password } = this.state;
      if (this.validateEmail(email)
       && password.length >= PASSWORD_MAX_LENGTH
       && username.length >= NAME_MIN_LENGTH) {
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
    const { username, email, password } = this.state;

    try {
      await requestRegister('/register', {
        name: username,
        email,
        password,
        role: 'customer' });

      dispatchRegisterChange({
        name: username,
        email,
        // password,
        role: 'customer' }); // aqui tá certo?

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
    const { email, password, isDisabled, errorHandling, username } = this.state;

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
              name="username"
              value={ username }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            <input
              id="input-email"
              data-testid="common_register__input-email"
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
// export default Register;
