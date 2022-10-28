import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
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
      const { email, password } = this.state;
      if (this.validateEmail(email)
       && password.length >= PASSWORD_MAX_LENGTH
       && name.length >= NAME_MIN_LENGTH) {
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

  redirectToProducts = () => {
    const history = useHistory();
    history.push('/customer/products');
  };

  render() {
    const { email, password, isDisabled, errorHandling, name } = this.state;

    return (
      <fieldset>
        <p>Cadastro</p>
        <form>
          <label htmlFor="input-name">
            <input
              id="input-name"
              data-testid="common_register__input-name"
              placeholder="Insira seu nome"
              type="name"
              name="name"
              value={ name }
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
            onClick={ () => this.redirectToProducts }
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

// const mapDispatchToProps = (dispatch) => ({
//   dispatchRegisterChange: (email, role) => dispatch(userLogin(email, role)),
// });

// Resgister.propTypes = {
//   history: propTypes.shape({
//     push: propTypes.func.isRequired,
//   }).isRequired,
//   dispatchRegisterChange: propTypes.func.isRequired,
// };

//  export default connect(null, mapDispatchToProps)(Register);
export default Register;
