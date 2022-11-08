import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/user';
import { requestPost, setTokenInHeaders } from '../utils/axios';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/localStorage';
import { PASSWORD_MAX_LENGTH, validateEmail } from '../utils';
import GenericText from '../components/GenericText';
import GenericInput from '../components/GenericInput';
import GenericButton from '../components/GenericButton';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabledButtons: true,
      invalidFields: false,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { token, role } = getFromLocalStorage('user') || {};

    if (token) {
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
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;

      if (validateEmail(email) && password.length >= PASSWORD_MAX_LENGTH) {
        this.setState({ disabledButtons: false });
      } else {
        this.setState({ disabledButtons: true });
      }
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { history, dispatchLoginChange } = this.props;

    try {
      const { name, role, token } = await requestPost('/login', { email, password });

      dispatchLoginChange(name, email, role);
      setTokenInHeaders(token);

      this.setState({ invalidFields: false });

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
      this.setState({ invalidFields: true });
    }
  };

  redirectToRegister = () => {
    const { history } = this.props;
    history.push('/register');
  };

  render() {
    const { email, password, disabledButtons, invalidFields } = this.state;

    return (
      <fieldset>
        <GenericText
          tag="p"
          text="Login"
        />
        <form onSubmit={ this.handleSubmit }>
          <GenericInput
            id="input-email"
            datatestId="common_login__input-email"
            placeholder="Insira seu e-mail"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <GenericInput
            id="input-password"
            datatestId="common_login__input-password"
            placeholder="Insira sua senha"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <GenericButton
            datatestId="common_login__button-login"
            type="submit"
            disabled={ disabledButtons }
            text="Entrar"
          />
        </form>
        <GenericButton
          datatestId="common_login__button-register"
          type="button"
          text="Crie sua conta"
          onClick={ this.redirectToRegister }
        />
        { invalidFields && (
          <GenericText
            tag="span"
            datatestId="common_login__element-invalid-email"
            text="E-mail ou senha incorretos. Tente novamente."
          />
        ) }
      </fieldset>
    );
  }
}

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
