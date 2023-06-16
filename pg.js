
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


const todayJob =  new Promise((resolve, reject) => {
    const query = `  WITH updated_rows AS (
        UPDATE tt
        SET date = date + (day_interval || ' day')::interval,
<<<<<<< Updated upstream
         day_interval = day_interval * 1.42
=======
         day_interval = CASE WHEN day_interval <= 300 THEN day_interval * 1.42 ELSE 300 END
>>>>>>> Stashed changes
        WHERE date <= CURRENT_DATE   
        RETURNING *
      )
      
	
	  SELECT user_id, json_agg(updated_rows) as objects
	  FROM updated_rows
	  GROUP BY user_id;
                         `

	//test
	// const query_test = `SELECT user_id, array_agg(*) as objects
	// FROM tt
	// WHERE DATE_TRUNC('day', date) < CURRENT_DATE
	// GROUP BY user_id;
	// `
	pool.query(query)
      .then(result => {
        const rows = result.rows;
        resolve(rows);
      })

	  	.then(pool.query(`DROP TABLE IF EXISTS tt`)
		.then(()=>pool.query(`CREATE TABLE tt AS SELECT * FROM mytable`)))
		 
	  	 

      .catch(error => {reject(error);});
  });
 



// async function insertData(...values)
module.exports = {
	save_message_bd,
	query_get_message,
	todayJob
}

 