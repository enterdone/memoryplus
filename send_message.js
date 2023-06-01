const { keyboardGen } = require("./keyboardGenerator.js")
 


async function sendMessage(bot, chatId, messageId) {
	const keyboard = keyboardGen(chatId, messageId)

	await bot.telegram.copyMessage(chatId, chatId, messageId, keyboard)
		.then(console.log(messageId))
}


module.exports =   sendMessage  