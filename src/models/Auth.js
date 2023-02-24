import { DataTypes, UUIDV4 } from "sequelize";

export const Auth = (sequelize) =>
  sequelize.define(
    "auth",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      isGoogle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
