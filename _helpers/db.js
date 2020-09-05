const mysql = require('mysql2/promise');

const connection = mysql.createPool( {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
} )

connection.query('select 1+1 as result', (err, result) => {
    if (err) console.log(err)
    else console.log('Connected to DB')
})

module.exports = connection