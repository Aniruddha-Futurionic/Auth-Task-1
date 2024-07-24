const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require("../config/dbConnect");

const User = sequelize.define(
  'User',
  {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      securityQuestion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      securityAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
      },
  },
  {
    // Other model options go here
    tableName : "users"
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = {User};