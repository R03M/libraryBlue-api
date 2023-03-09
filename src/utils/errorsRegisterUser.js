export const errorRegister = (
  email,
  password,
  isGoogle,
  firstName,
  lastName,
  image,
  position,
  status
) => {
  const errors = [];

  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (isGoogle === undefined) errors.push("isGoogle is required");
  if (!firstName) errors.push("First Name is required");
  if (!lastName) errors.push("Last Name is required");
  if (!image) errors.push("Image is required");
  if (!position) errors.push("Position is required");
  if (!status) errors.push("Status is required");

  if (errors.length > 0) {
    return { errorMessage: errors.join(", ") };
  }
};
