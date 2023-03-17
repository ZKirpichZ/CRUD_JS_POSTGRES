const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || 'root', // свой пароль
    host: 'localhost',
    port: 5432,
    database: process.env.DB || 'moviedb'  // название созданного бд
});


module.exports = pool;