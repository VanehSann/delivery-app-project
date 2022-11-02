const PASSWORD_MAX_LENGTH = 6;
const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export {
  PASSWORD_MAX_LENGTH,
  validateEmail,
};
