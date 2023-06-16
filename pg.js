
const { Pool } = require('pg');
const { init_db } = require('./initSQL.js')
// 
const pool = new Pool({
	user: 'ethxqheb',
	host: 'drona.db.elephantsql.com',
	database: "ethxqheb",
	password: 'N0L5F1Z0guYnyItKNPtRk1Kjr7snGCmi',
	port: 5432,
	max: 5,
	connectionTimeoutMillis: 10000
});
// init_db(pool);  //create db mytable in postgres
// pool.query('SELECT * FROM mytable')

function save_message_bd(user_id, message_id) {
	pool.query('INSERT INTO mytable (user_id, message_id,date, day_interval) VALUES ($1, $2, now()+INTERVAL \'1 day\', 1.1)', [user_id, message_id], (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			// console.log('Row inserted with ID:', res.rows[0].id);
		}
	});

}

async function query_get_message(user_id) {
	const query = `WITH updated_row AS (
		UPDATE mytable
		SET date = date + (day_interval * INTERVAL '1 day'),
			day_interval = CASE WHEN day_interval <= 300 THEN day_interval * 1.42 ELSE 300 END
		WHERE message_id = (SELECT message_id FROM mytable WHERE user_id = ${user_id}::text ORDER BY date LIMIT 1)
		RETURNING *
	) SELECT * FROM updated_row;`
	try {
		const result = await pool.query(query);

		const rows = result.rows;
		console.log('pg_rows______________');

		console.dir(rows.rows)
		return rows
	} catch (e) { console.log("🤷‍♂️err query_get_message", e) }

}


const todayJob = new Promise((resolve, reject) => {
	// const query = `  WITH updated_rows AS (
	//     UPDATE mytable
	//     SET date = date + (day_interval || ' day')::interval,
	//      day_interval = day_interval * 1.42
	//     WHERE date <= CURRENT_DATE   
	//     RETURNING *
	//   ) 

	console.log('todayJob =  new Promise');

	//   SELECT user_id, json_agg(updated_rows) as objects
	//   FROM updated_rows
	//   GROUP BY user_id;
	//                      `
	const query = `  WITH updated_rows AS (
        UPDATE mytable
        SET date = date + (day_interval || ' day')::interval,
         day_interval = CASE WHEN day_interval <= 300 THEN day_interval * 1.42 ELSE day_interval END
        WHERE date <= CURRENT_DATE   
        RETURNING *
      ) 
	  SELECT user_id, json_agg(updated_rows) as objects
	  FROM updated_rows
	  GROUP BY user_id;
                          `
	pool.query(query)
		.then(result => {
			const rows = result.rows;
			console.log('rows from pg.js');
			console.dir(rows[0])
			resolve(rows);
		})
		// .then(pool.query(`DROP TABLE IF EXISTS tt`)
		// .then(()=>pool.query(`CREATE TABLE tt AS SELECT * FROM mytable`)))
		.catch(error => { reject(error); });
});


function delete_from_BD(userId, messageId) {
	pool.query(`DELETE FROM mytable
	WHERE message_id = ${messageId}::integer AND user_id = ${userId}::text;
	`)
		.then(console.log('deleted id user', userId, messageId))
		.catch(e => console.log(e))
}



function raiting(user_id, message_id, rating){

	rating ? rating_pg_up() : rating_pg_down()


	rating_pg_up = () => {
		pool.query(` UPDATE mytable
		SET day_interval = CASE WHEN day_interval > 3 THEN day_interval / 3  ELSE 3 END,
			date = date + (day_interval * INTERVAL '1 day')
			WHERE	user_id = ${user_id} AND message_id = ${message_id};	`)	}

	rating_pg_down = () => {
		pool.query(`UPDATE mytable
		SET day_interval = CASE WHEN day_interval <= 300 THEN day_interval * 3 + 10  ELSE 300 END,
			date = date + (day_interval * INTERVAL '1 day')
			WHERE	user_id = ${user_id} AND message_id = ${message_id};`)	}
}
// UPDATE mytable
// day_interval = day_interval / 1.42
// SET date = date - (day_interval * INTERVAL '1 day'), 
// WHERE user_id = '${user_id}' AND message_id = ${message_id};
// async function insertData(...values)
module.exports = {
	save_message_bd,
	query_get_message,
	todayJob, delete_from_BD,raiting
}



 
 