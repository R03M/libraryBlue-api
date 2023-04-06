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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      edition: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            const enums = [EDITION.PUBLIC, EDITION.STUDY, EDITION.NA];
            if (!enums.includes(value)) {
              throw new Error(`${value} not a valid option`);
            }
          },
        },
      },
      letter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            const enums = [LETTER.BIG, LETTER.NORMAL, LETTER.NA];
            if (!enums.includes(value)) {
              throw new Error(`${value} not a valid option`);
            }
          },
        },
      },
      lastCount: {
        type: DataTypes.FLOAT,
      },
      lastCountDate: {
        type: DataTypes.DATE,
      },
      currentCount: {
        type: DataTypes.FLOAT,
      },
      itemEntry: {
        type: DataTypes.FLOAT,
      },
      itemEntryDate: {
        type: DataTypes.DATE,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            const enums = [
              CATEGORY.NA,
              CATEGORY.MAGAZINES,
              CATEGORY.BOOKS,
              CATEGORY.BROCHURES,
              CATEGORY.ACTIVITY_GUIDE,
              CATEGORY.TREATIES,
              CATEGORY.CARDS,
              CATEGORY.OTHERS,
            ];
            if (!enums.includes(value)) {
              throw new Error(`${value} not a valid option`);
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
