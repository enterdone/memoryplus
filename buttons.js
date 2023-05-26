
const button_pressed_on_message_pencil=()=>{
    this.bot.action('button_pressed_on_message_pencil', (ctx) => {
	ctx.reply('Вы нажали на кнопку "button_pressed_on_message_pencil"')
})
}




module.exports = {
    button_pressed_on_message_pencil
}