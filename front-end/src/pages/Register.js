import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRegister } from '../redux/actions/user';
import { requestPost } from '../utils/axios';
import { setIntoLocalStorage } from '../utils/localStorage';
import { PASSWORD_MAX_LENGTH, NAME_MIN_LENGTH, validateEmail } from '../utils';
import GenericText from '../components/GenericText';
import GenericInput from '../components/GenericInput';
import GenericButton from '../components/GenericButton';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
      password: '',
      disabledButtons: true,
      invalidFields: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { userName, userEmail, password } = this.state;

      if (validateEmail(userEmail)
        && password.length >= PASSWORD_MAX_LENGTH
        && userName.length >= NAME_MIN_LENGTH) {
        this.setState({ disabledButtons: false });
      } else {
        this.setState({ disabledButtons: true });
      }
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { userName, userEmail, password } = this.state;
    const { history, dispatchRegisterChange } = this.props;

    const requestBody = {
      name: userName,
      email: userEmail,
      password,
      role: 'customer',
    };

    const reduxBody = {
      name: userName,
      email: userEmail,
      role: 'customer',
    };

    try {
      const { name, email, role, token } = await requestPost('/register', requestBody);

      setIntoLocalStorage('user', { name, email, role, token });

      dispatchRegisterChange(reduxBody);

      this.setState({ invalidFields: false });

      history.push('/customer/products');
    } catch (error) {
      this.setState({ invalidFields: true });
    }
  };

  render() {
    const { userEmail, password, disabledButtons, invalidFields, userName } = this.state;

    return (
      <fieldset>
        <GenericText
          tag="p"
          text="Cadastro"
        />
        <form onSubmit={ this.handleSubmit }>
          <GenericInput
            id="input-name"
            datatestId="common_register__input-name"
            placeholder="Insira seu nome"
            type="text"
            name="userName"
            value={ userName }
            onChange={ this.handleChange }
          />
          <GenericInput
            id="input-email"
            datatestId="common_register__input-email"
            placeholder="Insira seu e-mail"
            type="email"
            name="userEmail"
            value={ userEmail }
            onChange={ this.handleChange }
          />
          <GenericInput
            id="input-password"
            datatestId="common_register__input-password"
            placeholder="Insira sua senha"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <GenericButton
            datatestId="common_register__button-register"
            type="submit"
            text="Cadastrar"
            disabled={ disabledButtons }
          />
        </form>
        { invalidFields && (
          <GenericText
            tag="span"
            datatestId="common_register__element-invalid_register"
            text="Os dados digitados são inválidos ou o usuário já está registrado."
          />
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
