// import { UserModel } from "../db";

export const getUser = async (req, res) => {
  try {
    const allUsers = "Data data data and more data";
    res.status(200).json({ allUsers });
  } catch (error) {
    res.send({ errorMessage: error });
  }
};

export const postUsers = async (req, res) => {
  const {
    firstName,
    lastName,
    image,
    position,
    status,
    mainNetwork,
    secondaryNetwork,
  } = req.body;
  const data = req.body;
  try {
    if (!data) res.status(404).json({ errorMessage: "Data required" });
    if (data) res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ errorMessage: error.message });
  }
};
