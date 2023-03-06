import { AuthModel, UserModel } from "../db/index.js";

export const getUser = async (req, res) => {
  try {
    const allUsers = await UserModel.findAll();
    res.status(200).json({ allUsers });
  } catch (error) {
    res.send({ errorMessage: error });
  }
};
