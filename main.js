const {Telegraf, Markup, Extra} = require('telegraf');
const axios = require("axios")
const marked = require('marked')
const postgres = require("./pg")
const formatMessageText = require("./formatMessageText")
const commands = require('./commands.js');

const bot = new Telegraf('6036674449:AAH86LMufrMwf2PbKYhK9VP7X4HDynnC05g')


	
	 ////////////////////////////////////////////////////////////////////////////////
bot.action('button1', (ctx) => {
	ctx.reply('Вы нажали на кнопку "Button 1"')
})

bot.action('button_yellow', async (ctx) => {

	const chatId = ctx.message.chat.id;
	const messageId = 286; // Получаем идентификатор ответного сообщения
	const messageText = await ctx.telegram.getMessageText(chatId, messageId);
	console.log(`Текст сообщения: ${messageText}`);
	
})



bot.action('button3', (ctx) => {
	ctx.reply('Вы нажали на кнопку "Button 3"')
})
// bot.action('b2', async (ctx) => {
// mtproto.call()
// })


	bot.action('more_info', (ctx) => {
		const message = ctx.update.callback_query.message;
		const chatId = message.chat.id;
		const messageId = message.message_id;
		const text = message.text;
		ctx.reply(`Message info:\nChat ID: ${chatId}\n  Message ID: ${messageId}\nText: ${text}`);
	 });

	 		////////////////
			//СТАРТ//////////////////////////////////////////////////////////////

	 const menu = (ctx) => {ctx.reply(`button pushed ${ctx.update.callback_query.from.username}`)
	 {
		// "update":{
		// 	"update_id":821919322,
		// 	"callback_query":{
		// 		"id":"5553654034744312892",
		// 		"from":{
		// 			"id":1293060843,
		// 			"is_bot":false,
		// 			"first_name":"█ＥＣＨＯ█¹²",
		// 			"username":"Twelvel",
		// 			"language_code":"ru"
		// 		},
		// 		"message":{
		// 			"message_id":382,
		// 			"from":{
		// 				"id":6036674449,
		// 				"is_bot":true,
		// 				"first_name":"memory_plus_bot",
		// 				"username":"memory_plus_2023_bot"
		
		// console.log(JSON.stringify(ctx))}
	} //INFO ctx.update
}
	 
	 bot 
	 .start(ctx => {
    ctx.reply(`Привет ${ctx.message.chat.username, JSON.stringify(ctx.message)}`, Markup
        .inlineKeyboard([
			  [Markup.button.callback('Меню', 'menu')]
			])
			) 
			;console.log(JSON.stringify(ctx.message))
		})
		.command('menu', ctx => menu(ctx))
		.action('menu', async ctx => {
			ctx.answerCbQuery();
			return menu(ctx)
		})
		////////////////КОМАНДЫ////////////////////////////////////////////////////////////////
		
		bot.command('help', commands.handleHelp);
		bot.command('getBD', commands.handleGetBD);
		bot.command('send_test', commands.handleSendTest);
		bot.command('send', commands.send);
		bot.command('test', commands.test)
		bot.command('get_message',commands.get_message)
	 ////////////////////////////////////////////////////////////////////////////////

 bot.action(/button_pressed_on_message_(\d+)/, (ctx) => {
	const message_id = ctx.match[1];
	ctx.reply(`Вы нажали кнопку на сообщении с идентификатором ${message_id}`);
 });
	 ////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
bot.on('message', (ctx)=>{
	postgres.insertData(ctx.message.chat.username
	,ctx.message.chat.first_name
	,ctx.message.chat.id
	,ctx.message.text
	,ctx.message.message_id
	,90)//username,name, user_id, message, rank
	
		console.log(`
		
		ctx.message.text ${JSON.stringify(ctx.message.text)}\n
		ctx.message.chat ${JSON.stringify(ctx.message.chat)}\n
		ctx.message.from ${JSON.stringify(ctx.message.from)}\n
		ctx.message.message_id ${JSON.stringify(ctx.message.message_id)}\n
		ctx.from ${JSON.stringify(ctx.from)}\n
		
		`);
		
		//  Define the keyboard using Markup
		 const keyboard = Markup.inlineKeyboard([
			[Markup.button.callback('🟡', 'button_yellow'),
			Markup.button.callback('🟠', 'button1'),
			Markup.button.callback('🟣', 'button1'),
			Markup.button.callback('🔵', 'button1'),
			Markup.button.callback('🟢', 'button1')]
			,[Markup.button.callback('more_info', 'more_info')]
		 ])
		 
		 // Attach the keyboard to the message using Extra
		//  const extra = Extra.markup(keyboard)
	const message = marked.parseInline(`
	
	**${ctx.message.text.toUpperCase()}** 
	${ctx.message.text}	 
	` )
			  ctx.replyWithHTML(message,keyboard)
		}).catch(function (err) {
			 console.error(err);
		});

		bot.on('edited_message', (ctx) => {
			const editedMessage = ctx.editedMessage
			const editedText = editedMessage.text
			console.log(`The edited message text is: ${editedText}`)
		 })
		 
////////////////////////////////////////////////////////////////////////////////
	bot.launch().then(
		console.log("Execute")
		)
		.catch((error) => {
		console.log(error,"ERRROOOOOOOOOORRR");
		});
////////////////////////////////////////////////////////////////////////////////



 
//bot - answer 
// bot.on('message', (ctx)=>{

// 	//  ctx.telegram.sendCopy(ctx.chat.id , ctx.message)
// 	console.log(`
	
// 	ctx.message.text ${JSON.stringify(ctx.message.text)}\n
// 	ctx.message.chat ${JSON.stringify(ctx.message.chat)}\n
// 	ctx.message.from ${JSON.stringify(ctx.message.from)}\n
// 	ctx.message.message_id ${JSON.stringify(ctx.message.message_id)}\n
// 	ctx.from ${JSON.stringify(ctx.from)}\n
	
// 	`);
	
// 	//  Define the keyboard using Markup
// 	 const keyboard = Markup.inlineKeyboard([
// 		Markup.button.callback('🟡', 'button1'),
// 		Markup.button.callback('🟠', 'button1'),
// 		Markup.button.callback('🟣', 'button1'),
// 		Markup.button.callback('🔵', 'button1'),
// 		Markup.button.callback('🟢', 'button1'),
// 		Markup.button.callback('Button 2', 'button2'),
// 	 ])
  
// 	 // Attach the keyboard to the message using Extra
// 	//  const extra = Extra.markup(keyboard)

	
// const message = marked.parseInline(`
// **${ctx.message.text.toUpperCase()}** 

// _перевод_:
// 			 <tg-spoiler>${ctx.message.text}</tg-spoiler>
			 
// ` )
	 
// 		  ctx.replyWithHTML(message,keyboard)

	
// 	}).catch(function (err) {
	
// 		 console.error(err);
		 
// 	});
	
