import { DataTypes, UUIDV4 } from "sequelize";

export const Auth = (sequelize) => {
  const AuthModel = sequelize.define(
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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  AuthModel.associate = (models) => {
    AuthModel.belongsTo(models.User, { foreignKey: "userId" });
  };

  return AuthModel;
};
