const PASSWORD_MAX_LENGTH = 6;

const NAME_MIN_LENGTH = 12;

const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export {
  PASSWORD_MAX_LENGTH,
  NAME_MIN_LENGTH,
  validateEmail,
};
