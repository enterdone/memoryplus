const postgres = require("./pg")
const {copyMessage, sendFromBd } = require("./send_message")

const button_pressed_on_message_pencil = (ctx) => {
    user_id = ctx.update.callback_query.from.id
    message_id = ctx.update.callback_query.data.split("/")[1]
    ctx.telegram.sendMessage(user_id, "✏️", { reply_to_message_id: message_id }).catch(e=>console.log(e ));
    

}


const button_more = async (ctx, bot) => {
    user_id = ctx.update.callback_query.from.id
    console.log(user_id);
    const rows =  await postgres.query_get_message(user_id)
    console.log('rows_____________');
    
    console.dir(rows)
   await  copyMessage(bot, user_id, rows[0].message_id)
   .catch((err)=>{console.log(err); postgres.delete_from_BD(user_id,rows[0].message_id);button_more (ctx, bot);
    if (user_id = 472758383){
        bot.telegram.sendMessage(472758383,"DELETED: "+user_id,rows[0].message_id)
        
    }
   })

console.log('after await');

    // ctx.telegram.sendMessage(user_id,"✏️", { reply_to_message_id: message_id })
    
  
 
    
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
