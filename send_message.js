const { keyboardGen } = require("./keyboardGenerator.js")
 
async function copyMessage(bot, chatId, messageId) {
	const keyboard =  keyboardGen(chatId, messageId)

	await bot.telegram.copyMessage(chatId, chatId, messageId, keyboard)
		.then(console.log(messageId))
		.catch(e=>console.log(e,chatId, messageId, 'Err from send_message.js' ))
}
 
module.exports =   { copyMessage }  