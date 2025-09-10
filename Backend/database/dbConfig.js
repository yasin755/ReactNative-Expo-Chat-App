//const mysql = require("mysql2");
import { Sequelize, DataTypes, Op } from "sequelize";

// Create a connection pool (better than single connection)
const sequelize = new Sequelize({
  host: "localhost", // MySQL server host
  username: "root", // your MySQL username
  password: "Mahira9*", // replace with your MySQL password
  database: "chatdb", // the DB you created
  dialect: "mysql",
  port: 3306,
  logging: false,
});

// Export promise-based pool for async/await
export { sequelize, DataTypes, Op, Sequelize };
