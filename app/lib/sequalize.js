import { Sequelize } from "sequelize";
import pg from "pg";
require("dotenv").config();

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres:root@localhost:5432/codemate_p3";

const sequelize = new Sequelize(DATABASE_URL, {
  dialectModule: pg,
  dialect: "postgres",
  logging: false, // Disable logging queries in production
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection Succesful");

    await sequelize.sync({alter:true});
    console.log("Ready to crud");
  } catch (error) {
    console.error("❌ Database error:", error.message);
  }
})();

export default sequelize;
