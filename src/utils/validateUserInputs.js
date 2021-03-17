const validateUsername = (username) => {
  // username must be 3 characters or longer, letters only
  if (username.length < 3) return false;
  return /^[A-Za-z]+$/.test(username);
};

const validatePassword = (password) => {
  // password must be 8 characters or longer
  return !(password.length < 8);
};

const validateUserInputs = (username, password) => {
  return validateUsername(username) && validatePassword(password);
};

export { validateUsername, validatePassword, validateUserInputs };
