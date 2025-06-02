import mariadb, { createPool } from 'mariadb';

const dbpool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "123",
    database: "test",
    port:3306,
    connectionLimit: 5,
    bigIntAsNumber: true
});

export default dbpool;