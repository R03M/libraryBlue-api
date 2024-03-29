import { AuthModel, CompanyModel, UserModel } from "../db/index.js";

const searchUserById = async (userId) => {
  return await UserModel.findOne({
    where: {
      id: [userId],
    },
    include: [
      { model: AuthModel, attributes: { exclude: ["password"] } },
      { model: CompanyModel, as: "company" },
    ],
  });
};

export default searchUserById;
