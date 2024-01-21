// import {Pool} from 'pg'
const { Pool } = require("pg");

const dbPool = new Pool({
  user: "postgres",
  database: "personal-website",
  password: "Authentic11.",
  port: 5432,
});

module.exports = dbPool;
