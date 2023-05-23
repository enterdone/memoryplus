const postgres = require("./pg")
async function start_GET_BD(ctx){
	users = await postgres.getUsers()
date = "result \n"
console.log(users)
	users.forEach((users) => {
		date+=(`Object: \n`);
		for (const key in users) {
			date+=(`  <b> ${key}:</b> ${users[key]} \n`);
		}
	 });
	ctx.reply(`/<tg-spoiler>start initialized</tg-spoiler> ${date}`,{ parse_mode: 'HTML' })
}


async function remember_pls(id) {
	const client = await postgres.connect();
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
		 RETURNING message_id, rank, id ;
	  `);
	  console.log(result.rows[0].message_id, result.rows[0].rank);
	  return result.rows[0];
	} catch (err) {
	  console.error(err);
	} finally {
	  await client.end();
	}
 }



module.exports ={start_GET_BD,remember_pls}