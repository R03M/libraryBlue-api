import { dbConfig } from "./config.js";
import { Auth } from "../models/Auth.js";
import { Item } from "../models/Item.js";
import { User } from "../models/User.js";
import { Company } from "../models/Company.js";

const auth = Auth(dbConfig);
const item = Item(dbConfig);
const user = User(dbConfig);
const company = Company(dbConfig);

auth.hasOne(user);
user.belongsTo(auth);

company.hasMany(user);
user.hasOne(company);

company.hasMany(item);
item.belongsTo(company);

export const syncDB = () => dbConfig.sync({ force: true });

export {
  user as UserModel,
  item as ItemModel,
  auth as AuthModel,
  company as CompanyModel,
};
