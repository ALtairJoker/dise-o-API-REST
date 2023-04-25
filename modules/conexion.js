const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "joyas",
  password: "123456",
  database: "joyas",
  allowExitOnIdle: true,
});

module.exports = pool;
