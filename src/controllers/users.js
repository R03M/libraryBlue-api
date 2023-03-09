import { AuthModel, UserModel } from "../db/index.js";

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModel.findAll();
    res.status(200).json({ allUsers });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const getDataUserId = async (req, res) => {
  //TODO: res.send(user(allData), company(name, id), associated(name, id) )

  try {
    // const myCompany = await CompanyModel.findAll({
    //   where: { id: idCompany },
    // });
    // let nameAssociated = myCompany[0].associatedCompany;
    // const companyAssociated = await CompanyModel.findAll({
    //   where: { name: nameAssociated },
    // });
    // let idAssociated = companyAssociated[0].id;
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const updateUser = async (req, res) => {
  const { id, firstName, lastName, image } = req.body;

  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "The user does not exist" });
    }
    firstName ? (user.firstName = firstName) : null;
    lastName ? (user.lastName = lastName) : null;

    if (!lastName && firstName) {
      user.fullName = `${firstName} ${user.lastName}`;
    }
    if (!firstName && lastName) {
      user.fullName = `${user.firstName} ${lastName}`;
    }
    if (firstName && lastName) {
      user.fullName = `${firstName} ${lastName}`;
    }
    image ? (user.image = image) : null;

    await user.save();

    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(505).json({ errorMessage: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const { idUser } = req.body;

  try {
    const userDeleted = await UserModel.destroy({
      where: {
        id: idUser,
      },
    });
    userDeleted !== 0
      ? res.status(200).json({ message: "User deleted" })
      : res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
