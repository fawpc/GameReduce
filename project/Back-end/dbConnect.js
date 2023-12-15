const pgp = require('pg-promise')();

const db = pgp({
    user: 'gradmin',
    password: 'GREmio$1903',
    host: 'gamereducer.postgres.database.azure.com',
    port: 5432,
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false 
    }
});
module.exports = db;