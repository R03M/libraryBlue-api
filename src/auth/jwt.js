import "dotenv/config";
import jwt from "jsonwebtoken";
import { TokenModel, UserModel } from "../db/index.js";
const { JWT_SECRET } = process.env;

export const genarateTokens = async (idUser) => {
  const user = await UserModel.findByPk(idUser);
  const token = jwt.sign({ idUser: idUser }, JWT_SECRET, { expiresIn: "7d" });

  const tokenSaved = await TokenModel.findOne({
    where: {
      user_id: idUser,
    },
  });
  await (tokenSaved
    ? tokenSaved.update({ token })
    : TokenModel.create({ token }).then((newToken) => newToken.setUser(user)));

  return token;
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const tokenValid = await TokenModel.findOne({
      where: {
        token,
      },
    });

    if (!tokenValid) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const tokenExpired = decodedToken.exp < Date.now() / 1000;
    if (tokenExpired) {
      return res.status(401).json({ message: "Token has expired" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default authMiddleware;
