const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "auth_app_db",
    "postgres",
    "password",
    {
      host: "localhost",
      dialect: "postgres",
      logging : false
    },
    
  );

const dbConnection = async () => {

      try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
      
}

module.exports = {dbConnection, sequelize};

