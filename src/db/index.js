import { dbConfig } from "./config";
import { Auth } from "../models/Auth";
import { Item } from "../models/Item";
import { User } from "../models/User";

const auth = Auth(dbConfig);
const item = Item(dbConfig);
const user = User(dbConfig);

user.hasMany(item);
item.belongsTo(user);
user.hasOne(auth);

export const syncDB = () => dbConfig.sync({ force: true });

export { user as AuthModel, item as ItemModel, auth as AuthModel };
