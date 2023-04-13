import { DataTypes, UUIDV4 } from "sequelize";

export const Token = (sequelize) =>
  sequelize.define(
    "token",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
