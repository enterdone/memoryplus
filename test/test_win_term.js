

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: "mydatabase",
  password: '0258',
  port: 5432,
});

 

pool.query(`
  CREATE TABLE IF NOT  EXISTS mytable (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    message_id INTEGER,
    date TIMESTAMP,
    interval INTERVAL
  )
`)
  .then(() => console.log('Table created successfully'))
  .catch(err => console.error('Error executing query', err))




pool.query('SELECT * FROM mytable', (error, results) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(results.rows);
  pool.end();
});