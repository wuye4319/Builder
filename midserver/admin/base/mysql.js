/**
 * author:nero
 * version:v1.0
 * plugin:init js
 */
'use strict'
const mysql = require('mysql')
let config = {
  // host: '120.78.121.179',
  host: 'localhost',
  port: '3306',
  user: 'root',
  // password: 'Lovelian4319!',
  password: '4319',
  database: 'wssso',
  queueLimit: 10
}
let pool = mysql.createPool(config)

class basesql {
  myquery (sql, param, fn) {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(sql, param, (error, results, fields) => {
        connection.release()
        if (error) {
          console.log(error)
          throw error
        }
        fn(results)
      })
    })
  }

  endconn () {
    pool.end()
    console.log('mysql connection is cloes!'.red)
  }
}

module.exports = basesql
