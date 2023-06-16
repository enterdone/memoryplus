const postgres = require("./pg")
const {copyMessage, sendFromBd } = require("./send_message")

const button_pressed_on_message_pencil = (ctx) => {
    user_id = ctx.update.callback_query.from.id
    message_id = ctx.update.callback_query.data.split("/")[1]
    ctx.telegram.sendMessage(user_id, "✏️", { reply_to_message_id: message_id }).catch(e=>console.log(e ));
    

}
const button_pressed_on_message_delete = (ctx) => {
    user_id = ctx.update.callback_query.from.id
    message_id = ctx.update.callback_query.data.split("/")[1]
    ctx.telegram.deleteMessage(user_id,  message_id )
    .then( postgres.delete_from_BD(user_id,  message_id ))
    .catch(e=>console.log(e ));
}
const button_change_raiting = (ctx,    rating) => {
    user_id = ctx.update.callback_query.from.id
    message_id = ctx.update.callback_query.data.split("/")[1]
    postgres.raiting(user_id,message_id,   rating)

    .then(  console.log("button_change_raiting^ "+   rating))
    .catch(e=>console.log(e ));
}

const button_more_info = (ctx) =>{
    const { message } = ctx.update.callback_query;
    const chatId = message.chat.id;
    const messageId = message.message_id;
    const text = message.text;
    
        ctx.reply(`Message info:\nChat ID: ${chatId}\n  Message ID: ${messageId}\nText: ${text}`);
}
const button_more = async (ctx, bot) => {
    user_id = ctx.update.callback_query.from.id
    console.log(user_id);
    const rows =  await postgres.query_get_message(user_id)
    console.log('rows_____________');
    
    console.dir(rows)
   await  copyMessage(bot, user_id, rows[0].message_id)
   .catch((err)=>{console.log(err); postgres.delete_from_BD(user_id,rows[0].message_id);button_more (ctx, bot);
    if (user_id == 472758383){
         
        bot.telegram.sendMessage(472758383, "DELETED: "+user_id+rows[0].message_id+new Date )
        
    }
   })

console.log('after await');

    // ctx.telegram.sendMessage(user_id,"✏️", { reply_to_message_id: message_id })
    
  
 
    
}

 




module.exports = {
    button_pressed_on_message_pencil,
    button_more,
    button_pressed_on_message_delete,
    button_change_raiting,
    button_more_info
}

// ctx
    //     .reply(`Вы нажали на кнопку "button_pressed_on_message_pencil${user_id} 
    //  ,${message_id}`)
// console.dir( ctx)
// console.log(user_id,message_id, "--------------")
// console.dir(ctx.update.callback_query.data)
    // console.log(ctx.update.callback_query.data.split("/")[1])
