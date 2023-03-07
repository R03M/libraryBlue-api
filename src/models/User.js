import { DataTypes, UUIDV4 } from "sequelize";
import { POSITION, STATUS } from "./values.enum.js";

export const User = (sequelize) =>
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: POSITION.HELPER,
        validate: {
          customValidator: (value) => {
            const enums = [
              POSITION.ADMIN,
              POSITION.MANAGER,
              POSITION.HELPER,
              POSITION.OBSERVANT,
            ];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: STATUS.ACTIVE,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            const enums = [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.BAN];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      accountCreation: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
