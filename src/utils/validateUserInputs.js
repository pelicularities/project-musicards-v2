const validateInputs = (username, password) => {
  // username must be 3 characters or longer, letters only
  // password must be 8 characters or longer
  if (username.length < 3) return false;
  if (password.length < 8) return false;
  return /^[A-Za-z]+$/.test(username);
};

export default validateInputs;
