const postgres = require("./pg")
const {copyMessage, sendFromBd } = require("./send_message")

const button_pressed_on_message_pencil = (ctx) => {
    user_id = ctx.update.callback_query.from.id
    message_id = ctx.update.callback_query.data.split("/")[1]
    ctx.telegram.sendMessage(user_id, "✏️", { reply_to_message_id: message_id }).catch(e=>console.log(e ));
    

}


const button_more = (ctx, bot) => {
    user_id = ctx.update.callback_query.from.id
    // ctx.telegram.sendMessage(user_id,"✏️", { reply_to_message_id: message_id })
    sendMessageFromBd = async () => {
        const rows = await postgres.query_get_message(user_id)
         console.log('rows from button.js',rows[0] );
         console.dir(rows)
         
        await copyMessage(bot, user_id, rows[0].message_id)
            .catch(err => { sendMessageFromBd(); console.log("🥵001", err); })
    }

    sendMessageFromBd()
}

 




module.exports = {
    button_pressed_on_message_pencil,button_more
}

// ctx
    //     .reply(`Вы нажали на кнопку "button_pressed_on_message_pencil${user_id} 
    //  ,${message_id}`)
// console.dir( ctx)
// console.log(user_id,message_id, "--------------")
// console.dir(ctx.update.callback_query.data)
    // console.log(ctx.update.callback_query.data.split("/")[1])
