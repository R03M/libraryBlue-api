import { CompanyModel } from "../db/index.js";

export const getCompanies = async (req, res) => {
  try {
    const allCompanies = await CompanyModel.findAll();
    allCompanies.length
      ? res.status(200).json({ allCompanies })
      : res.status(201).json({ allCompanies: "No Companies for now" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const registerCompany = async (req, res) => {
  try {
    const { name, image, associatedCompany, idUser } = req.body;
    const allCompanies = await CompanyModel.findAll();
    const existingCompanies = allCompanies.map((e) => e.name);

    if (existingCompanies.includes(name)) {
      return res
        .status(406)
        .json({ message: "There is already a company with that name" });
    }
    const newCompany = await CompanyModel.create({
      name,
      image,
      associatedCompany,
    });

    const response = await newCompany.addUser(idUser);

    res.status(200).json({ message: "Company Created", response });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { nameCompany } = req.body;
    const companyDelete = await CompanyModel.destroy({
      where: {
        name: nameCompany,
      },
    });
    companyDelete !== 0
      ? res.status(200).json({ message: "Company successfully removed" })
      : res.status(404).json({ message: "Company not found" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateCompany = async (req, res) => {
  const { id, name, image, associatedCompany } = req.body;

  try {
    const updated = await CompanyModel.update(
      {
        name,
        image,
        associatedCompany,
      },
      { where: { id: id } }
    );

    res.status(200).json({ message: "Update successful", updated });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
