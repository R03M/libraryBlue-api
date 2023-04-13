import { ItemModel, CompanyModel } from "../db/index.js";

const allItems = async (idCompany, nameAssociated) => {
  const companyItems = await ItemModel.findAll({
    where: { companyId: idCompany },
  });

  let allItems = [...companyItems];

  if (nameAssociated) {
    const idAssociatedCompany = await CompanyModel.findOne({
      where: { name: nameAssociated },
    });
    const associateItems = await ItemModel.findAll({
      where: { companyId: idAssociatedCompany.id, associatedCompany: true },
    });
    allItems = [...allItems, ...associateItems];
  }

  return allItems;
};

export default allItems;
