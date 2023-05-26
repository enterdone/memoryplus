


const button_pressed_on_message_pencil = (ctx) => {
    user_id = ctx.update.callback_query.from.id
    message_id = ctx.update.callback_query.data.split("/")[1]
    // ctx
    //     .reply(`Вы нажали на кнопку "button_pressed_on_message_pencil${user_id} 
    //  ,${message_id}`)
       ctx.telegram.sendMessage(user_id,"✏️", { reply_to_message_id: message_id })
// console.dir( ctx)
// console.log(user_id,message_id, "--------------")
// console.dir(ctx.update.callback_query.data)
// console.log(ctx.update.callback_query.data.split("/")[1])

}




module.exports = {
    button_pressed_on_message_pencil
}