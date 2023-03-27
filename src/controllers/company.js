import { CompanyModel, UserModel } from "../db/index.js";
import { errorsSelectCompany } from "../utils/errorsSelectCompany.js";

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
    const { name, image, code, associatedCompany, codeAssociated, idUser } =
      req.body.company;

    const allCompanies = await CompanyModel.findAll();
    const existingCompanies = allCompanies.map((e) => e.name);
    const theAssociateExist = existingCompanies.includes(associatedCompany);

    if (existingCompanies.includes(name)) {
      return res
        .status(406)
        .json({ message: "There is already a company with that name" });
    }

    if (associatedCompany !== "") {
      if (theAssociateExist) {
        const companyAssociatedData = allCompanies.filter(
          (company) => company.name === associatedCompany
        );
        if (companyAssociatedData.code !== codeAssociated) {
          return res.status(401).json({ message: "Wrong partner code" });
        }
      }

      if (!theAssociateExist) {
        return res
          .status(404)
          .json({ message: `There is no company ${associatedCompany}` });
      }
    }

    const company = await CompanyModel.create({
      name,
      image,
      code,
      associatedCompany,
      userId: idUser,
    });

    const user = await UserModel.findByPk(idUser);

    await user.setCompany(company);

    res.status(200).json({ company: "Company Created", user: user });
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
  const { id, name, code, image, associatedCompany } = req.body;

  try {
    const updated = await CompanyModel.update(
      {
        name,
        image,
        code,
        associatedCompany,
      },
      { where: { id: id } }
    );

    res.status(200).json({ message: "Update successful", updated });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const selectCompany = async (req, res) => {
  const { nameCompany, idUser } = req.body.selectCompanyInf;
  
  try {
    const company = await CompanyModel.findOne({
      where: {
        name: nameCompany,
      },
    });

    const user = await UserModel.findByPk(idUser);

    const errors = errorsSelectCompany(company, user);
    if (errors) return res.status(400).json(errors);

    await company.addUser(idUser);
    res.status(200).json({ message: "Updated", user: user });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ errorMessage: error.message });
  }
};
