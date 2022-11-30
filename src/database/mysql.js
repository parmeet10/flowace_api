const Knex = require("knex");

const mysqlConnectionString = {
  host: "flowacedatabase.ckhscy7lmrx2.ap-south-1.rds.amazonaws.com",
  user: "root",
  password: "rootqwertyuiop",
  database: "flowacedatabase",
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