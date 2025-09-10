//const mysql = require("mysql2");
import { Sequelize, DataTypes, Op } from "sequelize";

// Create a connection pool (better than single connection)
// Dev
/*const sequelize = new Sequelize({
  host: "localhost", // MySQL server host
  username: "root", // your MySQL username
  password: "Mahira9*", // replace with your MySQL password
  database: "chatdb", // the DB you created
  dialect: "mysql",
  port: 3306,
  logging: false,
});*/

// Prod
const sequelize = new Sequelize({
  host: "chatappdb-chat-app755.d.aivencloud.com", // MySQL server host
  username: "avnadmin", // your MySQL username
  password: process.env.AIVEN_PASSWORD, // replace with your MySQL password
  database: "chatdb", // the DB you created
  dialect: "mysql",
  port: 10346,
  logging: false,
});

// Export promise-based pool for async/await
export { sequelize, DataTypes, Op, Sequelize };
