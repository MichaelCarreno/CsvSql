const { Pool } = require ('pg');
require('dotenv').config();

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NOMBRE,
    password : process.env.DB_CONTRA,
    port : process.env.DB_PORT,
});

module.exports = pool;