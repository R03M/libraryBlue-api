import "dotenv/config";
import { Sequelize } from "sequelize";
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const dbConfig = new Sequelize({
  logging: false,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false
    // }
  },
});
