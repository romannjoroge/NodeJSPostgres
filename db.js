const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    database: 'test',
    port: 5432,
    password: 'p2o5.h2so4',
    port: 5432
})

module.exports = pool