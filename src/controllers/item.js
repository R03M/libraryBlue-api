import { ItemModel, CompanyModel } from "../db/index.js";

export const getItemByCompany = async (req, res) => {
  try {
    const { idCompany } = req.body;

    const myCompany = await CompanyModel.findAll();

    console.log(myCompany);

    const items = await ItemModel.findAll({
      where: { companyId: idCompany },
    });

    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const createItem = async (req, res) => {
  const {
    idCompany,
    code,
    name,
    language,
    image,
    edition,
    letter,
    lastCount,
    lastCountDate,
    lastDischarge,
    itemEntry,
    itemEntryData,
    category,
    associatedCompany,
  } = req.body;

  try {
    const company = await CompanyModel.findByPk(idCompany);
    const items = await ItemModel.findAll({
      where: { companyId: company.id },
    });
    const nameItems = items.map((e) => e.name);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    if (nameItems.includes(name)) {
      return res
        .status(404)
        .json({ error: "An item with that name already exists" });
    }

    const newItem = await ItemModel.create({
      code,
      name,
      language,
      image,
      edition,
      letter,
      lastCount,
      lastCountDate,
      lastDischarge,
      itemEntry,
      itemEntryData,
      category,
      associatedCompany,
    });

    await newItem.setCompany(company);

    res.status(201).json({ message: "Item created successfully", newItem });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
