
const { Pool } = require('pg');
const { init_db } = require('./initSQL.js')

const pool = new Pool({
	user: 'ethxqheb',
	host: 'drona.db.elephantsql.com',
	database: "ethxqheb",
	password: 'N0L5F1Z0guYnyItKNPtRk1Kjr7snGCmi',
	port: 5432,
});
// init_db(pool);  //create db mytable in postgres
pool.query('SELECT * FROM mytable')

function bd_write(user_id,message_id) {
	pool.query('INSERT INTO mytable (user_id, message_id,date, day_interval) VALUES ($1, $2, now()+INTERVAL \'1 day\', 1)', [user_id, message_id], (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			// console.log('Row inserted with ID:', res.rows[0].id);
		}
	});
}

async function query_get_message (chatId){
	
}

// async function insertData(...values)
module.exports = {
	bd_write,
	query_get_message
}