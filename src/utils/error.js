export const errorRegister = (email, password, isGoogle) => {
  const errors = [];
 
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (isGoogle === undefined) errors.push("isGoogle is required");

  if (errors.length > 0) {
    return { errorMessage: errors.join(", ") };
  }
};
