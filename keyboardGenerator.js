const { Markup } = require('telegraf');
   

function keyboardGen(chatId){
	const row1 = [	Markup.button.callback('👍👍', `button_plus2_${chatId}`),
	Markup.button.callback('👍', `button_plus_${chatId}`),
	Markup.button.callback('👎', `button_min_${chatId}`),
	Markup.button.callback('👎👎', `button_min2_${chatId}`),
	Markup.button.callback('❌DELETE', 'delete')]
	
	const row2 = [	Markup.button.callback('👁‍🗨', `button_more_${chatId}`),
	Markup.button.callback('✏️', `button_pressed_on_message_pencil${chatId}`),
	Markup.button.callback('more_info', 'more_info')]
	
	const keyboard = Markup.inlineKeyboard([row1, row2])
	return keyboard
}

module.exports = {keyboardGen}
