import { AuthModel, UserModel } from "../db/index.js";
import { comparePass, hashPassW } from "../utils/bcrypt.js";
import { errorRegister } from "../utils/error.js";

export const getUser = async (req, res) => {
  try {
    const allUsers = await UserModel.findAll({
      include: [AuthModel],
    });
    res.status(200).json({ allUsers });
  } catch (error) {
    res.send({ errorMessage: error });
  }
};

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

  //TODO: Add validation to => firstName, lastName, image, position, status.

  const errors = errorRegister(email, password, isGoogle);
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
