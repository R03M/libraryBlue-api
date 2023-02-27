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
        type: DataTypes.ENUM(POSITION.ADMIN, POSITION.MANAGER, POSITION.HELPER),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(STATUS.ACTIVE, STATUS.INACTIVE, STATUS.BAN),
        allowNull: false,
      },
      accountCreation: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      mainNetwork: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondaryNetwork: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
