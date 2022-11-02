import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRegister } from '../redux/actions/user';
import { requestData, requestPost } from '../utils/axios';
import { getFromLocalStorage } from '../utils/localStorage';

class AdminManage extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      role: 'customer',
      password: '',
      isDisabled: true,
      errorHandling: false,
      listOfMembers: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    try {
      const results = await requestData('/admin/manage');

      const { token } = getFromLocalStorage('user') || {};

      const userData = await requestPost('/login/validate', { token });

      this.setState({
        listOfMembers: [...results],
      });
      if (userData.role !== 'administrator') {
        history.push('/');
      }
    } catch (error) {
      history.push('/');
    }
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

    const { dispatchRegisterChange } = this.props;
    const { username, email, password, role } = this.state;

    try {
      await requestPost('/admin/manage', {
        name: username,
        email,
        password,
        role });

      dispatchRegisterChange({
        name: username,
        email,
        role });

      this.setState({
        errorHandling: false,
      });
    } catch (error) {
      this.setState({
        errorHandling: true,
      });
    }
  };

  render() {
    const {
      username,
      email,
      role,
      password,
      isDisabled,
      errorHandling,
      listOfMembers,
    } = this.state;

    return (
      <>
        {/* cadastro dos novos usuarios - remover esses comentários */}
        <fieldset>
          <p>Cadastrar novo usuário</p>
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="input-name">
              <input
                id="input-name"
                data-testid="admin_manage__input-name"
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
                data-testid="admin_manage__input-email"
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
                data-testid="admin_manage__input-password"
                placeholder="Insira sua senha"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
            <select
              data-testid="admin_manage__select-role"
              id="selectRole"
              name="role"
              onChange={ this.handleChange }
              value={ role }
            >
              <option>customer</option>
              <option>seller</option>
              {/* <option>administrator</option> */}
            </select>
            <button
              data-testid="admin_manage__button-register"
              type="submit"
              disabled={ isDisabled }
            >
              Cadastrar
            </button>
          </form>
          { errorHandling && (
            <span data-testid="admin_manage__element-invalid-register">
              DADOS INVÁLIDOS PARA CADASTRO
            </span>
          ) }
        </fieldset>

        {/* iniciei os bonus sem querer  */}
        <table>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
          { listOfMembers && listOfMembers.map((member, index) => (
            <tr key={ index }>
              <th data-testid={ `admin_manage__element-user-table-item-number-${index}` }>
                { index }
              </th>
              <th data-testid={ `admin_manage__element-user-table-item-name-${index}` }>
                { member.name }
              </th>
              <th data-testid={ `admin_manage__element-user-table-item-email-${index}` }>
                { member.email }
              </th>
              <th data-testid={ `admin_manage__element-user-table-item-role-${index}` }>
                { member.role }
              </th>
              <th data-testid={ `admin_manage__element-user-table-item-remove-${index}` }>
                X
              </th>
            </tr>
          ))}
        </table>
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
