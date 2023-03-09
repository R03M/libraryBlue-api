export const errorsSelectCompany = (company, user) => {
  const errors = [];

  if (!company) errors.push("Company not found");
  if (!user) errors.push("User not found");

  if (errors.length > 0) {
    return { errorMessage: errors.join(", ") };
  }
};
