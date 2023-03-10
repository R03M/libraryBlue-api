import { dbConfig } from "./config.js";
import { Auth } from "../models/Auth.js";
import { Item } from "../models/Item.js";
import { User } from "../models/User.js";
import { Company } from "../models/Company.js";

const auth = Auth(dbConfig);
const item = Item(dbConfig);
const user = User(dbConfig);
const company = Company(dbConfig);

auth.hasOne(user, { foreignKey: "userId" });
user.belongsTo(auth, { foreignKey: "authId" });

company.hasMany(user, { as: "users" });
user.belongsTo(company, { as: "company", foreignKey: "companyId" });

company.hasMany(item, { as: "items" });
item.belongsTo(company, { as: "company", foreignKey: "companyId" });

export const syncDB = () => dbConfig.sync({ force: true });

export {
  user as UserModel,
  item as ItemModel,
  auth as AuthModel,
  company as CompanyModel,
};
