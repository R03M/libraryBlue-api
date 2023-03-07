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

<<<<<<< HEAD
export const syncDB = () => dbConfig.sync({ force: false });
=======

export const syncDB = () => dbConfig.sync({ force: true });
>>>>>>> 9f5b09ce140f20bf54cf5f4a4a2cf59a942b972b

export {
  user as UserModel,
  item as ItemModel,
  auth as AuthModel,
  company as CompanyModel,
};
