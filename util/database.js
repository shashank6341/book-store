// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'Pikachu@1998'
// });

// module.exports = pool.promise();

// --------------- Sequelize-----------------

const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-complete', 'root', 'password', {
  dialect: "mysql",
  host: "localhost",
});

// This also creates a connection pool

module.exports = sequelize;