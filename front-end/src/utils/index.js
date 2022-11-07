const PASSWORD_MAX_LENGTH = 6;

const NAME_MIN_LENGTH = 12;

const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const availableRoles = ['customer', 'seller'];

const headOptions = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];
const headOptionsCheckout = ['Item', 'Descrição', 'Quantidade',
  'Valor Unitário', 'Sub-total', 'Remover Item'];
const headOptionsCheckout2 = ['Item', 'Descrição', 'Quantidade',
  'Valor Unitário', 'Sub-total'];

export {
  PASSWORD_MAX_LENGTH,
  NAME_MIN_LENGTH,
  validateEmail,
  availableRoles,
  headOptions,
  headOptionsCheckout,
  headOptionsCheckout2,
};
