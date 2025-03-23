import { Sequelize } from "sequelize";
// const Sequelize = require()
import pg from "pg";
require("dotenv").config();

const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://postgres:_tGTdZfS!MHP9m6@db.pirefezxppgggchemllx.supabase.co:5432/postgres";

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
// module.exports = sequelize
// 