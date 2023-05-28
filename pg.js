
const { Pool } = require('pg');
const { init_db } = require('./initSQL.js')
// 
const pool = new Pool({
	user: 'ethxqheb',
	host: 'drona.db.elephantsql.com',
	database: "ethxqheb",
	password: 'N0L5F1Z0guYnyItKNPtRk1Kjr7snGCmi',
	port: 5432,
	max:5,
	connectionTimeoutMillis: 10000
});
// init_db(pool);  //create db mytable in postgres
// pool.query('SELECT * FROM mytable')

function save_message_bd(user_id,message_id) {
	pool.query('INSERT INTO mytable (user_id, message_id,date, day_interval) VALUES ($1, $2, now()+INTERVAL \'1 day\', 1.1)', [user_id, message_id], (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			// console.log('Row inserted with ID:', res.rows[0].id);
		}
	});
	
}

async function query_get_message (user_id){
	const query  = `WITH updated_rows AS (
		UPDATE mytable
		SET date = date + (day_interval::integer || ' day')::interval,
			 day_interval = day_interval * 1.42
 WHERE   mytable.date = (SELECT MIN(date) FROM mytable WHERE user_id = ${user_id}::text)
		RETURNING *
	 )
	 SELECT *
	 FROM mytable
 WHERE   mytable.date = (SELECT MIN(date) FROM mytable WHERE user_id = ${user_id}::text)
   ;`
try{
	 const result = await pool.query(query);
    const rows = await result.rows;
	
	 console.dir(rows, "pg rows")
	 return rows
	}catch{if(err){console.log(err)}}

}


return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM mytable WHERE date_column = (SELECT MIN(date_column) FROM mytable)')
      .then(result => {
        const rows = result.rows;
        resolve(rows);
      })
      .catch(error => {reject(error);});
  });
 



// async function insertData(...values)
module.exports = {
	save_message_bd,
	query_get_message
}

каждый
охотник
желает
знать
где
сидит 
фазан