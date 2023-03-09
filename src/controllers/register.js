import { AuthModel, CompanyModel, UserModel } from "../db/index.js";
import { hashPassW } from "../utils/bcrypt.js";
import { errorRegister } from "../utils/errorsRegisterUser.js";
import { errorsSelectCompany } from "../utils/errorsSelectCompany.js";

export const registerUser = async (req, res) => {
  let {
    email,
    password,
    isGoogle,
    firstName,
    lastName,
    image,
    position,
    status,
  } = req.body;

  const errors = errorRegister(
    email,
    password,
    isGoogle,
    firstName,
    lastName,
    image,
    position,
    status
  );
  if (errors) return res.status(400).json(errors);

  try {
    const hashedPassword = await hashPassW(password);
    password = hashedPassword;

    const auth = await AuthModel.create({
      email,
      password,
      isGoogle,
    });

    const userData = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      image,
      position,
      status,
      authId: auth.id,
    };

    await UserModel.create(userData);

    res.status(200).json({ message: "Registered user successfully", userData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const authData = await AuthModel.findAll();
    const { email } = req.body;

    let allEmail = authData.map(({ email, isGoogle }) => ({ email, isGoogle }));

    let response = allEmail.find((e) => e.email === email) || {
      email: false,
      isGoogle: null,
    };

    res.status(200).json({ chechEmail: response });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const selectCompany = async (req, res) => {
  const { idCompany, idUser } = req.body;
  try {
    const company = await CompanyModel.findByPk(idCompany);
    const user = await UserModel.findByPk(idUser);

    const errors = errorsSelectCompany(company, user);
    if (errors) return res.status(400).json(errors);

    await company.addUser(idUser);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
