import { ItemModel, CompanyModel, UserModel } from "../db/index.js";
import { POSITION } from "../models/values.enum.js";
import allItems from "../utils/alltems.js";

export const getItemByCompany = async (req, res) => {
  try {
    const { idCompany, associatedCompany } = req.body;

    const items = await allItems(idCompany, associatedCompany);

    res.status(200).json({ allItems: items });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const createItem = async (req, res) => {
  const {
    idCompany,
    idUser,
    code,
    title,
    subtitle,
    language,
    image,
    edition,
    letter,
    lastCount,
    lastCountDate,
    currentCount,
    itemEntry,
    itemEntryDate,
    category,
    associatedCompany,
  } = req.body.item;

  try {
    const user = await UserModel.findByPk(idUser);
    if (user.position === POSITION.OBSERVANT) {
      res.status(401).json({
        message:
          "You have to be an administrator or a helper to be able to create an item.",
      });
      return;
    }
    const company = await CompanyModel.findByPk(idCompany);
    const items = await ItemModel.findAll({
      where: { companyId: company.id },
    });
    const titleItems = items.map((e) => e.title);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    if (titleItems.includes(title)) {
      return res
        .status(404)
        .json({ error: "An item with that title already exists" });
    }

    const newItem = await ItemModel.create({
      code,
      title,
      subtitle,
      language,
      image,
      edition,
      letter,
      lastCount,
      lastCountDate,
      currentCount,
      itemEntry,
      itemEntryDate,
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
    id,
    code,
    title,
    subtitle,
    language,
    image,
    edition,
    letter,
    lastCount,
    lastCountDate,
    currentCount,
    itemEntry,
    itemEntryDate,
    category,
    associatedCompany,
    exitOnly,
    idUser,
  } = req.body.item;

  try {
    const user = await UserModel.findByPk(idUser);
    if (user.position === POSITION.OBSERVANT) {
      res.status(401).json({
        message:
          "You have to be a manager or helper to be able to update an item.",
      });
      return;
    }
    const item = await ItemModel.findByPk(id);

    if (!exitOnly) {
      code ? (item.code = code) : null;
      title ? (item.title = title) : null;
      subtitle ? (item.subtitle = subtitle) : null;
      language ? (item.language = language) : null;
      image ? (item.image = image) : null;
      edition ? (item.edition = edition) : null;
      letter ? (item.letter = letter) : null;
      lastCount ? (item.lastCount = lastCount) : null;
      currentCount ? (item.currentCount = currentCount) : null;
      lastCountDate ? (item.lastCountDate = lastCountDate) : null;

      itemEntry
        ? ((item.itemEntry = itemEntry),
          (item.currentCount = item.currentCount + itemEntry))
        : null;

      itemEntryDate ? (item.itemEntryDate = itemEntryDate) : null;
      category ? (item.category = category) : null;
      associatedCompany === false || associatedCompany === true
        ? (item.associatedCompany = associatedCompany)
        : null;
    }
    if (exitOnly) {
      item.currentCount = item.currentCount - currentCount;
    }

    await item.save();

    res.status(200).json({ itemUpdated: item });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { idItem, idUser } = req.body;

  try {
    const user = await UserModel.findByPk(idUser);
    if (user.position === POSITION.OBSERVANT) {
      res.status(401).json({
        message:
          "You have to be a manager or helper to be able to delete an item.",
      });
      return;
    }
    const itemDelete = await ItemModel.destroy({
      where: {
        id: idItem,
      },
    });
    itemDelete !== 0
      ? res
          .status(201)
          .json({ message: "Item successfully removed", id: idItem })
      : res.status(404).json({ message: "Item not found" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const createManyItems = async (req, res) => {
  const { idCompany, associatedCompany, data } = req.body;

  try {
    const company = await CompanyModel.findByPk(idCompany);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    const items = Object.values(data);
    await Promise.all(
      items.map(async (item) => {
        const newItem = await ItemModel.create({
          code: item.code,
          title: item.title,
          subtitle: item.subtitle,
          language: item.language,
          image: item.image,
          edition: item.edition,
          letter: item.letter,
          category: item.category,
          associatedCompany: item.associatedCompany,
        });
        await newItem.setCompany(company);
      })
    );

    const itemsUpdated = await allItems(idCompany, associatedCompany);

    res.status(201).json({ allItems: itemsUpdated });
  } catch (error) {
    res.status(505).json({ errorMessage: error.message });
  }
};
