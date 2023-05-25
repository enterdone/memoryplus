// const bot = require('./main.js')
const {keyboardGen} = require("./keyboardGenerator.js")
// const { remember_pls } = require('./database.js');

// const chatId = '1293060843';
// const messageId = '513';
// const messageId = '345';/** * ! ERROR */
 
async function  sendMessage(  bot, chatId, messageId = 1) {
	// .then((message) => {
	//   console.log('Сообщение существует:', message);
	// })
	const keyboard = keyboardGen(chatId)
	try {
		await bot.telegram.copyMessage(chatId, chatId, messageId, keyboard)
			.catch(error => {
				console.log("🔵ERROR MSG______sendMessage ID/chatId: ",
				messageId,chatId, error)
			})
	} catch (error) {
		console.log("🔵ERRORЭ", error)
	}
}


async function sendFromBd(bot, chatId) {
	
	get2 = await remember_pls(chatId)
get = await query_get_message(chatId)
	// console.log (get, JSON.stringify(get))
	sendMessage(bot, chatId, get.message_id)
}

module.exports = { sendMessage, sendFromBd }