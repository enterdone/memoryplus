
const { Pool } = require('pg');
const {init_db} = require('./initSQL.js')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: "mydatabase",
  password: '0258',
  port: 5432,
});
// init_db(pool);  //switch to 1 time

pool.query('SELECT * FROM mytable')

// pool.query('INSERT INTO table_name (column1, column2, column3) VALUES ($1, $2, $3)', ['value1', 'value2', 'value3'], (err, res) => {
// 	if (err) {
// 	  console.log(err.stack);
// 	} else {
// 	  console.log('Row inserted with ID:', res.rows[0].id);
// 	}
//  });
 


// async function insertData(...values)
