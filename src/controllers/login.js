import "dotenv/config";
import { AuthModel, CompanyModel, UserModel } from "../db/index.js";
import { comparePass } from "../utils/bcrypt.js";
import searchUserById from "../utils/searchUserById.js";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;


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
      const token = jwt.sign({ userId: authUser.id }, JWT_SECRET);

      res.status(200).json({ userData, token });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
