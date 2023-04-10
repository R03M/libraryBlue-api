import { CompanyModel, UserModel } from "../db/index.js";
import { POSITION } from "../models/values.enum.js";
import { errorsSelectCompany } from "../utils/errorsSelectCompany.js";

export const getCompanies = async (req, res) => {
  const { idCompany } = req.body;
  try {
    const allCompanies = await CompanyModel.findAll();

    if (idCompany) {
      const companies = allCompanies.filter((e) => e.id !== idCompany);
      companies.length > 0
        ? res.status(200).json(companies)
        : res.sendStatus(204);
      return;
    }

    res.status(200).json({ allCompanies });
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
  const { id, code, image, associatedCompany } = req.body.dataCompany;

  try {
    const company = await CompanyModel.findByPk(id);

    code ? (company.code = code) : null;
    image ? (company.image = image) : null;
    associatedCompany ? (company.associatedCompany = associatedCompany) : null;

    await company.save();

    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const selectCompany = async (req, res) => {
  const { nameCompany, idUser } = req.body.selectCompanyInf;
  console.log(req.body);
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
    res.status(500).json({ errorMessage: error.message });
  }
};

export const allCompanyUsers = async (req, res) => {
  const { companyName } = req.body;
  try {
    const allUsers = await CompanyModel.findOne({
      where: {
        name: companyName,
      },
      include: { model: UserModel, as: "users" },
    });

    const allCompanyUsers = allUsers.users.filter(
      (user) => user.position !== "Manager"
    );
    allCompanyUsers.length > 0
      ? res.status(200).json({ allCompanyUsers })
      : res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const rmUserOfCompany = async (req, res) => {
  const { idUser } = req.body;

  try {
    const user = await UserModel.findOne({
      where: {
        id: idUser,
      },
      include: [
        {
          model: CompanyModel,
          as: "company",
        },
      ],
    });

    user.position = POSITION.OBSERVANT;

    const company = user.company;

    if (!company) {
      return res
        .status(404)
        .json({ message: "User is not associated with any company" });
    }
    await user.save();
    await company.removeUser(user);

    res.status(200).json({ userDeleted: user.id });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
