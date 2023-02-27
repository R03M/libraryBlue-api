import { dbConfig } from "./config.js";
import { Auth } from "../models/Auth.js";
import { Item } from "../models/Item.js";
import { User } from "../models/User.js";

const auth = Auth(dbConfig);
const item = Item(dbConfig);
const user = User(dbConfig);

user.hasMany(item);
item.belongsTo(user);
user.hasOne(auth);

export const syncDB = () => dbConfig.sync({ force: true });

export { user as UserModel, item as ItemModel, auth as AuthModel };
