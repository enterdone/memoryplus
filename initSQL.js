function init_db(pool){
	pool.query(`
	CREATE TABLE IF NOT  EXISTS mytable (
		id SERIAL PRIMARY KEY,
		user_id INTEGER,
		message_id INTEGER,
		date TIMESTAMP,
		day_interval INTEGER
		)
		`)
	}
module.exports = {init_db}

// id
// user_id
// date TIMESTAMP
// interval INTERVAL 
////////////////////////////////////////
// CREATE DATABASE mydatabase
//     WITH
//     OWNER = postgres
//     ENCODING = 'UTF8'
//     CONNECTION LIMIT = -1
//     IS_TEMPLATE = False;