import { dbConfig } from "./config.js";
import { Auth } from "../models/Auth.js";
import { Item } from "../models/Item.js";
import { User } from "../models/User.js";
import { Company } from "../models/Company.js";
import { Token } from "../models/Token.js";

const auth = Auth(dbConfig);
const item = Item(dbConfig);
const user = User(dbConfig);
const company = Company(dbConfig);
const token = Token(dbConfig);

auth.hasOne(user);
user.belongsTo(auth);

company.hasMany(user, { as: "users" });
user.belongsTo(company, { as: "company", foreignKey: "companyId" });

company.hasMany(item, { as: "items" });
item.belongsTo(company, { as: "company", foreignKey: "companyId" });

token.belongsTo(user, { foreignKey: 'user_id' });

export const syncDB = () => dbConfig.sync({ alter: true });

export {
  user as UserModel,
  item as ItemModel,
  auth as AuthModel,
  company as CompanyModel,
  token as TokenModel,
};
