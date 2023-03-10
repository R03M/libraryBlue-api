import { AuthModel, CompanyModel, UserModel } from "../db/index.js";
import { comparePass } from "../utils/bcrypt.js";

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

    if (!authUser) return res.status(401).json({ message: "User not found" });
    if (!isCorrectPassword)
      return res.status(401).json({ message: "Incorrect password" });

    if (isCorrectPassword) {
      const userData = await UserModel.findOne({
        where: {
          id: [authUser.userId],
        },
        include: [{ model: AuthModel }, { model: CompanyModel }],
      });
      res.status(200).json({ userData });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
