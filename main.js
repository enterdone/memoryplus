const { Telegraf, Markup, Extra } = require('telegraf');
const axios = require("axios")
const marked = require('marked')
const postgres = require("./pg")
const { sendMessage, sendFromBd } = require("./send_message")
// const formatMessageText = require("./formatMessageText")
const commands = require('./commands.js');
const {keyboardGen} = require("./keyboardGenerator.js")
const {daily_message_bot} = require('./time.js')
const{button_pressed_on_message_pencil,button_more} = require('./buttons')
// const repl = require('repl');
// repl.start().context = require('./main');


const port =  process.env.PORT || 3000;


const bot = new Telegraf('6036674449:AAH86LMufrMwf2PbKYhK9VP7X4HDynnC05g')


daily_message_bot()
////////////////////////////////////////////////////////////
//////////////////// 
bot.on('edited_message', (ctx) => {
	const editedMessage = ctx.editedMessage
	const editedText = editedMessage.text
	console.log(`The edited message text is: ${editedText}`)
}) 


////////////////////////////////////////////////////////////

////////////////////////////////////////
bot.command('help', ctx => ctx.reply('/start \n /getBD \n /more_info\n /send \n /test \n  /send_test\n /get_message'));
// bot.command('getBD', commands.handleGetBD);
// bot.command('send_test', commands.handleSendTest);
////////////////////////////////////////



bot.command('send', async ctx =>{
	const rows = await postgres.query_get_message(ctx.message.chat.id)
	await sendMessage(  bot,	ctx.message.chat.id ,rows[0].message_id)
	// await sendMessage( bot,	1293060843 ,1114)
	// /*С*/console.dir(bot,rows[0].message_id, ctx.message.chat.id)
	// ctx.reply(sendMessage(bot, ctx.message.chat.id,rows. ), "hallo")
} 
)
////////////////////////////////////////
bot.on('message', ctx =>{postgres.save_message_bd(ctx.chat.id,ctx.message.message_id)
})

bot.action('button1', (ctx) => {
	ctx.reply('Вы нажали на кнопку "Button 1"')
})
bot.action('button_yellow', async (ctx) => {
	
	const chatId = ctx.message.chat.id;
	const messageId = 286; // Получаем идентификатор ответного сообщения
	const messageText = await ctx.telegram.getMessageText(chatId, messageId);
	console.log(`Текст сообщения: ${messageText}`);

})
bot
.action(/button_pressed_on_message_pencil(\d+)/, (ctx) => {
	button_pressed_on_message_pencil(ctx)
	  ctx.answerCbQuery()})
.action('more_info', async (ctx) => {
	ctx.answerCbQuery()
	const message = ctx.update.callback_query.message;
	const chatId = message.chat.id;
	const messageId = message.message_id;
	const text = message.text;
	ctx.reply(`Message info:\nChat ID: ${chatId}\n  Message ID: ${messageId}\nText: ${text}`);
})
.action(/button_more_(\d+)/, (ctx) => {
	button_more(ctx, bot)})
// 	const chatId = ctx.update.callback_query.from.id;
// 	// console.log(JSON.stringify(ctx))
// 	// ctx.reply(`Вы нажали кнопку на сообщении с идентификатором ${message_id}`);
// 	sendFromBd(bot, chatId)
// });
////////////////
//СТАРТ//////////////////////////////////////////////////////////////

const menu = (ctx) => {
	ctx.reply(`button pushed ${ctx.update.callback_query.from.username}`)
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
			; console.log(JSON.stringify(ctx.message))
	})
	.command('menu', ctx => menu(ctx))
	.action('menu', async ctx => {
		ctx.answerCbQuery();
		return menu(ctx)
	})
////////////////КОМАНДЫ////////////////////////////////////////////////////////////////


// bot.command('test', commands.test)
// bot.command('get_message',commands.get_message)
////////////////////////////////////////////////////////////////////////////////
// bot.command('send', sendMessage);



bot.action(/button_pressed_on_message_(\d+)/, (ctx) => {
	const message_id = ctx.match[1];
	ctx.reply(`Вы нажали кнопку на сообщении с идентификатором ${message_id}`);
});


bot.action(/button_plus2_(\d+)/, (ctx) => {
	const message_id = ctx.match[1];
	ctx.reply(`Вы нажали кнопку button_plus2_ на сообщении с идентификатором ${message_id}`);
});
bot.action(/button_plus_(\d+)/, (ctx) => {
	const message_id = ctx.match[1];
	ctx.reply(`Вы нажали кнопку на button_plus_ с идентификатором ${message_id}`);
});
bot.action(/button_min_(\d+)/, (ctx) => {
	const message_id = ctx.match[1];
	ctx.reply(`Вы нажали кнопку на button_min_ с идентификатором ${message_id}`);
});
bot.action(/button_min2_(\d+)/, (ctx) => {
	const message_id = ctx.match[1];
	ctx.reply(`Вы нажали кнопку на button_min2_ с идентификатором ${message_id}`);
});


////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
const server =  bot.launch().then(
	console.log("Execute")
)
	.catch((error) => {
		console.log(error, "😭Error: bot.launch()😭");
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


// const chatId = 1293060843; // Замените YOUR_CHAT_ID на id вашего чата

// function sendMessage(bot) {

// 		const row1 = [
// 		Markup.button.callback('🟡', 'button_yellow'),
// 		Markup.button.callback('🟠', 'b2'),
// 		Markup.button.callback('🟣', 'button1'),
// 		Markup.button.callback('🔵', 'button1'),
// 		Markup.button.callback('🟢', `button_pressed_on_message_${chatId}`),
// 		Markup.button.callback('✏️', `button_pressed_on_message_pencil${chatId}`),
// 		Markup.button.callback('more_info', 'more_info'),
// 	]
// 	const row2 = [
// 		Markup.button.callback('❌DELETE', 'delete'),
// 		Markup.button.callback('more_info', 'more_info')
// 	]
// 	const keyboard = Markup.inlineKeyboard([row1, row2])


//   bot.telegram.sendMessage(chatId, 'Привет, я бот!');
//   bot.telegram.copyMessage(
// 	chatId, 
// 	chatId, 
// 	586, keyboard,
// 	{reply_markup: keyboard, reply_to_message_id: 586},
// 	);
// }
const chatId = '1293060843';
const messageId = "1114"//'513';
// setTimeout(() => { sendMessage( chatId,messageId), console.log("вызвался таймаут") }, 3000);

  


// const send = async (ctx) => {
// 	get = await remember_pls(ctx.message.chat.id)
// 	console.log("message_id:______", get.message_id, get.message_id)
// 	// const message = await bot.telegram.getMessage(472758383, message_id);

// 	const row1 = [
// 		Markup.button.callback('🟡', 'button_yellow'),
// 		Markup.button.callback('🟠', 'b2'),
// 		Markup.button.callback('🟣', 'button1'),
// 		Markup.button.callback('🔵', 'button1'),
// 		Markup.button.callback('🟢', `button_pressed_on_message_${ctx.message.message_id}`),
// 		Markup.button.callback('✏️', `button_pressed_on_message_pencil${ctx.message.message_id}`),
// 		Markup.button.callback('more_info', 'more_info'),
// 	]
// 	const row2 = [
// 		Markup.button.callback('❌DELETE', 'delete'),
// 		Markup.button.callback('more_info', 'more_info')
// 	]
// 	const keyboard = Markup.inlineKeyboard([row1, row2])

// 	ctx.telegram.copyMessage(
// 		ctx.message.chat.id, 
// 		ctx.message.chat.id, 
// 		get.message_id, 
// 		{reply_markup: keyboard, reply_to_message_id: get.message_id},
// 		);
// 	//  ctx.reply(message,keyboard, { parse_mode: 'HTML' })
// 	bot.telegram.sendMessage(ctx.message.chat.id, 'Ответ на ваше сообщение', { reply_to_message_id: get.message_id });

// 	// const data = JSON.stringify(ctx); // Строка для записи в файл
// 	// const filePath = './ctx'; // Путь к файлу

// 	// fs.writeFile(filePath, data, (err) => {
// 	//   if (err) throw err;
// 	//   console.log('Данные записаны в файл');
// 	// });

// } 
const func1 = (msg) => sendFromBd(bot, chatId, msg)




// Экспорт сервера
module.exports = server;


