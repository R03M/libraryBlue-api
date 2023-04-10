import { ItemModel, CompanyModel } from "../db/index.js";

export const getItemByCompany = async (req, res) => {
  try {
    const { idCompany, associatedCompany } = req.body;

    const companyItems = await ItemModel.findAll({
      where: { companyId: idCompany },
    });

    let allItems = [...companyItems];

    if (associatedCompany) {
      const idAssociatedCompany = await CompanyModel.findOne({
        where: { name: associatedCompany },
      });
      const associateItems = await ItemModel.findAll({
        where: { companyId: idAssociatedCompany.id, associatedCompany: true },
      });
      allItems = [...allItems, ...associateItems];
    }
    res.status(200).json({allItems});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

export const createItem = async (req, res) => {
  const {
    idCompany,
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
    itemEntryData,
    category,
    associatedCompany,
  } = req.body.item;

  try {
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
    itemEntryData,
    category,
    associatedCompany,
    exitOnly,
  } = req.body.item;

  try {
    
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
      itemEntry ? (item.itemEntry = itemEntry) : null;
      itemEntryData ? (item.itemEntryData = itemEntryData) : null;
      category ? (item.category = category) : null;
      associatedCompany ? (item.associatedCompany = associatedCompany) : null;
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
  const { idItem } = req.body;

  try {
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
  const { idCompany, data } = req.body;

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
    const newItems = await ItemModel.findAll({
      where: { companyId: idCompany },
    });
    res.status(201).json({ allItems: newItems });
  } catch (error) {
    console.log({ errorMessage: error.message });
    res.status(505).json({ errorMessage: error.message });
  }
};
