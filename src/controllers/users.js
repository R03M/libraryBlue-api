import { AuthModel, CompanyModel, UserModel } from "../db/index.js";
import pkg from "lodash";
import searchUserById from "../utils/searchUserById.js";
import { POSITION } from "../models/values.enum.js";
const { isEqual } = pkg;

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModel.findAll({
      include: [
        {
          model: AuthModel,
          required: false,
          attributes: { exclude: ["password"] },
        },
        { model: CompanyModel, as: "company", required: false },
      ],
    });
    allUsers.length
      ? res.status(200).json({ allUsers })
      : res.status(201).json({ allUsers: "No Users for now" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id, firstName, lastName, image } = req.body.data;

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

    const userData = await searchUserById(id);

    res.status(200).json({ userData });
  } catch (error) {
    res.status(505).json({ errorMessage: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const { idUser } = req.body;

  try {
    const user = await UserModel.findOne({
      where: {
        id: idUser,
      },
      include: [
        {
          model: AuthModel,
          as: "auth",
        },
        {
          model: CompanyModel,
          as: "company",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const company = user.company;
    if (company) {
      user.position === POSITION.MANAGER
        ? await user.company.destroy()
        : await company.removeUser(user);
    }

    const authDeleted = await user.auth.destroy();

    if (authDeleted) {
      await user.destroy();
      return res.status(200).json({ message: "User deleted" });
    } else {
      return res.status(500).json({ errorMessage: "Failed to delete user" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const validateData = async (req, res) => {
  const data = req.body;

  try {
    const user = await UserModel.findOne({
      where: {
        id: data.id,
      },
      raw: true,
    });
    return isEqual(data, user)
      ? res.status(200).json({ message: "User data is valid" })
      : res.status(406).json({ message: "User data is invalid" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updatePositionUser = async (req, res) => {
  const { id, position } = req.body.data;

  try {
    const user = await UserModel.findByPk(id);

    if (!position) {
      return res.status(400).json({ message: "Position is required" });
    }
    if (!user) {
      return res.status(404).json({ message: "The user does not exist" });
    }

    user.position = position;

    await user.save();

    const userData = await searchUserById(id);

    res.status(200).json({ userData });
  } catch (error) {
    res.status(505).json({ errorMessage: error.message });
  }
};
