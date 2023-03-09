import { ItemModel, CompanyModel } from "../db/index.js";

export const getItemByCompany = async (req, res) => {
  try {
    const { idCompany, idAssociatedCompany } = req.body;

    const associateItems = await ItemModel.findAll({
      where: { companyId: idAssociatedCompany, associatedCompany: true },
    });

    const companyItems = await ItemModel.findAll({
      where: { companyId: idCompany },
    });

    res.status(200).json({ companyItems, associateItems });
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

export const updateItem = async (req, res) => {
  const {
    idCompany,
    id,
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
    const companyExists = await CompanyModel.findOne({
      where: { id: idCompany },
    });
    if (!companyExists) {
      return res
        .status(400)
        .json({ errorMessage: "The company does not exist" });
    }
    const item = await ItemModel.findByPk(id);

    code ? (item.code = code) : null;
    name ? (item.name = name) : null;
    language ? (item.language = language) : null;
    image ? (item.image = image) : null;
    edition ? (item.edition = edition) : null;
    letter ? (item.letter = letter) : null;
    lastCount ? (item.lastCount = lastCount) : null;
    lastCountDate ? (item.lastCountDate = lastCountDate) : null;
    lastDischarge ? (item.lastDischarge = lastDischarge) : null;
    itemEntry ? (item.itemEntry = itemEntry) : null;
    itemEntryData ? (item.itemEntryData = itemEntryData) : null;
    category ? (item.category = category) : null;
    associatedCompany ? (item.associatedCompany = associatedCompany) : null;

    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { idItem } = req.body;
  try {
    const itemDelete = await ItemModel.destroy({
      where: {
        id: idItem,
      },
    });
    itemDelete !== 0
      ? res.status(201).json({ message: "Item successfully removed" })
      : res.status(404).json({ message: "Item not found" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
