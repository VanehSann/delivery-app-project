import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRegister } from '../redux/actions/user';
import { requestData, requestPost, requestDelete } from '../utils/axios';
import { getFromLocalStorage } from '../utils/localStorage';
import {
  PASSWORD_MAX_LENGTH,
  NAME_MIN_LENGTH,
  validateEmail,
  headOptions,
  availableRoles } from '../utils';
import GenericText from '../components/GenericText';
import GenericInput from '../components/GenericInput';
import GenericButton from '../components/GenericButton';
import GenericSelect from '../components/GenericSelect';
import GenericTable from '../components/GenericTable';

class AdminManage extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      role: 'customer',
      password: '',
      disabledButtons: true,
      invalidFields: false,
      userList: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    try {
      const { token } = getFromLocalStorage('user') || {};

      const userData = await requestPost('/login/validate', { token });

      if (userData.role !== 'administrator') {
        history.push('/');
      }
      const results = await requestData('/admin/manage');

      this.setState({
        userList: [...results],
      });
    } catch (error) {
      history.push('/');
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { username, email, password } = this.state;

      if (validateEmail(email)
        && password.length >= PASSWORD_MAX_LENGTH
        && username.length >= NAME_MIN_LENGTH) {
        this.setState({
          disabledButtons: false,
        });
      } else {
        this.setState({
          disabledButtons: true,
        });
      }
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, role } = this.state;
    const { dispatchRegisterChange } = this.props;

    const requestBody = {
      name: username,
      email,
      password,
      role,
    };

    const reduxBody = {
      name: username,
      email,
      role,
    };

    try {
      const { userList } = this.state;
      const newUser = await requestPost('/admin/manage', requestBody);

      dispatchRegisterChange(reduxBody);

      this.setState({
        userList: [...userList, newUser],
        invalidFields: false,
      });
    } catch (error) {
      this.setState({
        invalidFields: true,
      });
    }
  };

  deleteUser = async (id) => {
    const { userList } = this.state;

    try {
      await requestDelete(`/admin/manage/${id}`);
      const newUsers = userList.filter((user) => user.id !== id);
      this.setState({ userList: newUsers });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      username,
      email,
      role,
      password,
      disabledButtons,
      invalidFields,
      userList,
    } = this.state;

    return (
      <>
        <fieldset>
          <GenericText
            tag="p"
            text="Gerenciamento de Usuários"
          />
          <form onSubmit={ this.handleSubmit }>
            <GenericInput
              id="input-name"
              datatestId="admin_manage__input-name"
              placeholder="Insira seu nome"
              type="text"
              name="username"
              value={ username }
              onChange={ this.handleChange }
            />
            <GenericInput
              id="input-email"
              datatestId="admin_manage__input-email"
              placeholder="Insira seu e-mail"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <GenericInput
              id="input-password"
              datatestId="admin_manage__input-password"
              placeholder="Insira sua senha"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
            <GenericSelect
              datatestId="admin_manage__select-role"
              name="role"
              value={ role }
              onChange={ this.handleChange }
              options={ availableRoles }
            />
            <GenericButton
              datatestId="admin_manage__button-register"
              type="submit"
              text="Cadastrar usuário"
              disabled={ disabledButtons }
            />
          </form>
          { invalidFields && (
            <GenericText
              tag="span"
              datatestId="admin_manage__element-invalid-register"
              text="Os dados digitados são inválidos ou o usuário já está registrado."
            />
          ) }
        </fieldset>
        <GenericTable
          headOptions={ headOptions }
          data={ userList }
          deleteUser={ this.deleteUser }
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRegisterChange: (body) => dispatch(userRegister(body)),
});

AdminManage.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatchRegisterChange: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AdminManage);
