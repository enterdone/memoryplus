const { bot } = require('./main.js');
const {keyboardGen} = require("./keyboardGenerator.js")
const { remember_pls } = require('./database.js');
// const chatId = '1293060843';
// const messageId = '513';
// const messageId = '345';/** * ! ERROR */
 
async function  sendMessage(bot, chatId, messageId = 1) {
	// .then((message) => {
	//   console.log('Сообщение существует:', message);
	// })
	const keyboard = keyboardGen(chatId)
	try{ 
		await  bot.telegram.copyMessage(chatId,chatId,messageId, keyboard,
			{
				reply_markup: {
				  inline_keyboard: [[{
					 text: '👍', // Текст кнопки-реакции
					 callback_data: 'like' // Данные, которые будут отправлены в обработчик реакции
				  }]]
				},
				parse_mode: 'HTML' // Если вы хотите использовать эмодзи, нужно использовать HTML-разметку
			 })
			.catch(console.log("🔵ERROR MSG______sendMessage ID/chatId: ",messageId,chatId));
		} catch(error){
			console.log("🔵ERRORЭ")
		}
}

async function sendFromBd(bot, chatId) {
	get = await remember_pls(chatId)
	// console.log (get, JSON.stringify(get))
	sendMessage(bot, chatId, get.message_id)
}

module.exports = { sendMessage, sendFromBd }