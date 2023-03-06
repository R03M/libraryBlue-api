import { DataTypes, UUIDV4 } from "sequelize";
import { CATEGORY, LETTER, EDITION } from "./values.enum.js";

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
      edition: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            const enums = (EDITION.PUBLIC, EDITION.STUDY);
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      letter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            const enums = (LETTER.BIG, LETTER.NORMAL);
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            const enums =
              (CATEGORY.MAGAZINES,
              CATEGORY.BOOKS,
              CATEGORY.BROCHURES,
              CATEGORY.ACTIVITY_GUIDE,
              CATEGORY.TREATIES,
              CATEGORY.OTHERS);
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
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
