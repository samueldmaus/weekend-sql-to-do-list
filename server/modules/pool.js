const pg = require('pg');

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log('connected to postgres');
});

pool.on("error", (error) => {
    console.log('error in postgres:', error);
});

module.exports = pool;