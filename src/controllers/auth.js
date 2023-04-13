import { AuthModel, TokenModel, UserModel } from "../db/index.js";
import { hashPassW } from "../utils/bcrypt.js";
import { errorRegister } from "../utils/errorsRegisterUser.js";
import searchUserById from "../utils/searchUserById.js";
import { genarateTokens } from "../auth/jwt.js";
import { comparePass } from "../utils/bcrypt.js";

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const authData = await AuthModel.findAll({
      attributes: ["email", "isGoogle"],
    });

    let response = authData
      .map(({ email, isGoogle }) => ({ email, isGoogle }))
      .find((e) => e.email === email) || {
      email: false,
      isGoogle: null,
    };

    res.status(200).json({ infocheck: response });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
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
  } = req.body.data;

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

    const user = await UserModel.create({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      image,
      position,
      status,
    });
    const auth = await AuthModel.create({
      email,
      password,
      isGoogle,
      userId: user.id,
    });

    await user.setAuth(auth);

    const token = await genarateTokens(auth.userId);

    const userData = await searchUserById(auth.userId);

    res.status(200).json({ token, userData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const authUser = await AuthModel.findOne({
      where: {
        email,
      },
    });

    const isCorrectPassword =
      authUser && (await comparePass(password, authUser.password));

    if (!authUser) return res.status(404).json({ message: "User not found" });
    if (!isCorrectPassword)
      return res.status(401).json({ message: "Incorrect password" });

    if (isCorrectPassword) {
      const userData = await searchUserById(authUser.userId);
      const token = await genarateTokens(authUser.id);

      res.status(200).json({ userData, token });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const logOut = async (req, res) => {
  const { userId } = req.body;
  try {
    const userToken = await TokenModel.findByPk(userId);
    userToken.token = null;
    await userToken.save();
    res.status(200);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
