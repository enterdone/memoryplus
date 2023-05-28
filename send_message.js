// const bot = require('./main.js')
const {keyboardGen} = require("./keyboardGenerator.js")
// const { remember_pls } = require('./database.js');


 
async function  sendMessage(  bot, chatId, messageId = 1) {
	const keyboard = keyboardGen(chatId,messageId)
	// try {
		await bot.telegram.copyMessage(chatId, chatId, messageId, keyboard)
		.then(console.log(messageId))
		// .catch(error => {
		// 		console.log("🔵ERROR MSG______sendMessage ID/chatId: ",
		// 		messageId,chatId,  error)
		// 		 if(error.response.description=='Bad Request: message to copy not found'){}
		// 		//TODO if user delited msg -> sendMessage(bot, chatId, messageId) IN CYCLE
			// })
	// } catch (error) {
		// .catch(e=>(console.log("🔵ERRORЭ", e)))
	// }
}


async function sendFromBd(bot, chatId) {
	
	get2 = await remember_pls(chatId)
get = await query_get_message(chatId)
	// console.log (get, JSON.stringify(get))
	sendMessage(bot, chatId, get.message_id)
}

module.exports = { sendMessage, sendFromBd }