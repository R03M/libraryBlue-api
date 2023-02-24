import { DataTypes, UUIDV4 } from "sequelize";
import { CATEGORY, LETTER, POSITION, STATUS, TYPE } from "./values.enum";

export const User = (sequelize) =>
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
        type: DataTypes.NUMBER,
      },
      lastCountDate: {
        type: DataTypes.DATE,
      },
      currentStock: {
        type: DataTypes.NUMBER,
      },
      lastDischarge: {
        type: DataTypes.NUMBER,
      },
      itemEntry: {
        type: DataTypes.NUMBER,
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
          CATEGORY.OTHERS
        ),
        allowNull: false,
      },
      secondaryNetwork: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
