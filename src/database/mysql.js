const Knex = require("knex");

const mysqlConnectionString = {
  host: "",
  user: "", 
  password: "", 
  database: "",
  port: 3306,
};

const KNEX_CONFIG = {
  client: "mysql",
  connection: mysqlConnectionString,
};

const knex = Knex(KNEX_CONFIG);
const data = {
  knex: knex,
};
module.exports = data;