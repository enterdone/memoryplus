
const { Client } = require('pg');

function newClient() {
  return new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '0258',
    port: 5432,
  });
}

async function connect() {
  const client = newClient();
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
    return client; // возвращаем клиент, чтобы его можно было использовать в других функциях
  } catch (err) {
    console.error('Error connecting to PostgreSQL database', err);
  }
}

async function query(sql) {
  const client = await connect(); // получаем клиент
  const result = await client.query(sql);
  return result.rows;
}

async function disconnect() {
  const client = await connect(); // получаем клиент
  await client.end();
  console.log('Disconnected from PostgreSQL database');
}

async function disconnect() {
	const client = await connect(); // получаем клиент
	await client.end();
	console.log('Disconnected from PostgreSQL database');
 }



async function getUsers() {
	const client = await connect();

	try {
		const result = await client.query('SELECT * FROM users');
		return result.rows;
	} catch (err) {
		console.error('Error executing query', err);
	} finally {
		await client.end();
	}
}
 
async function insertData(...values) {
	const client = await connect(); // получаем клиент
	const sql = `
	  INSERT INTO users (name, user_name, user_id, message, message_id, rank)
	  VALUES ($1, $2, $3, $4, $5, $6)
	`;
	try {
	  await client.query(sql, values);
	  console.log('Data inserted successfully');
	} catch (err) {
	  console.error('Error inserting data:', err);
	} finally {
	  await disconnect();
	}
 }
 
// async function saveVariables(var1, var2, var3, var4) {
// 	const client = await connect();
// 	try {
// 	  const queryText = 'INSERT INTO users (var1, var2, var3, var4) VALUES ($1, $2, $3, $4)';
// 	  const values = [var1, var2, var3, var4];
// 	  const res = await client.query(queryText, values);
// 	  console.log(res.rowCount + ' rows inserted');
// 	} catch (err) {
// 	  console.error('Error saving variables', err);
// 	} finally {
// 	  client.end();
// 	  console.log('Disconnected from PostgreSQL database');
// 	}
//  }
//  saveVariables(1,2,3,4)












async function remember_pls(id) {
	const client = await connect();
	try {
		// const client = await connect();
	  const result = await client.query(`
		 UPDATE users 
		 SET rank = rank - 10 
		 WHERE message_id = (
			SELECT message_id 
			FROM users 
			WHERE rank = (
			  SELECT MAX(rank) 
			  FROM users
			) 
			ORDER BY RANDOM() 
			LIMIT 1
		 ) 
		 RETURNING message_id, rank;
	  `);
	  console.log(result.rows[0].message_id, result.rows[0].rank);
	  return result.rows[0].message_id;
	} catch (err) {
	  console.error(err);
	} finally {
	  await client.end();
	}
 }
 
 




module.exports = {
	Client,
	connect,
	query,
	disconnect,
	// postMsg,
	getUsers,
	insertData,
	remember_pls
 };
 
 