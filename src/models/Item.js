import { DataTypes, UUIDV4 } from "sequelize";
import { CATEGORY, LETTER, TYPE } from "./values.enum.js";

export const Item = (sequelize) =>
  sequelize.define(
    "item",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(TYPE.PUBLIC, TYPE.STUDY),
        allowNull: false,
      },
      letter: {
        type: DataTypes.ENUM(LETTER.BIG, LETTER.NORMAL),
        allowNull: false,
      },
      lastCount: {
        type: DataTypes.INTEGER,
      },
      lastCountDate: {
        type: DataTypes.DATE,
      },
      currentStock: {
        type: DataTypes.INTEGER,
      },
      lastDischarge: {
        type: DataTypes.INTEGER,
      },
      itemEntry: {
        type: DataTypes.INTEGER,
      },
      itemEntryDate: {
        type: DataTypes.DATE,
      },
      category: {
        type: DataTypes.ENUM(
          CATEGORY.MAGAZINES,
          CATEGORY.BOOKS,
          CATEGORY.BROCHURES,
          CATEGORY.ACTIVITY_GUIDE,
          CATEGORY.TREATIES,
          CATEGORY.OTHERS
        ),
        allowNull: false,
      },
      associatedCompany: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
