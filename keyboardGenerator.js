const { Markup } = require('telegraf');


function keyboardGen(chatId, message_id) {
	const row1 = [
		 
		Markup.button.callback('👍', `button_like${message_id}`),
		Markup.button.callback('👎', `button_dislike${message_id}`),
		Markup.button.callback(':grey_question:', `button_question${message_id}`),
		Markup.button.callback('❌DELETE', `delete${chatId}/${message_id}`)]
 
	const row2 = [
		Markup.button.callback('👁‍🗨', `button_more_${chatId}`),
		Markup.button.callback('✏️', `button_pressed_on_message_pencil${chatId}/${message_id}`),
		Markup.button.callback('more_info', 'more_info')]

	const keyboard = Markup.inlineKeyboard([row1, row2])
	return keyboard
}

module.exports = { keyboardGen }
