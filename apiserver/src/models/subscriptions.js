import { Sequelize, Model } from "sequelize";

const subscriptions = (sequelize) => {
  class Subscriptions extends Model {}
  Subscriptions.init(
    {
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { notEmpty: true, isEmail: true },
        indexes: [],
      },
      is_email_sent: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { sequelize, modelName: "subscriptions" }
  );
  return Subscriptions;
};
export default subscriptions;
