// const { Markup } = require('telegraf');
// const { start_GET_BD, remember_pls } = require('./database.js');
// const postgres = require("./pg")
// const fs = require('fs');

const handleHelp = (ctx) => ctx.reply('/start \n /getBD \n /more_info\n /send \n /test \n  /send_test\n /get_message');
// const handleGetBD = (ctx) => start_GET_BD(ctx);


// const handleSendTest = (ctx) => {
// 	const message = ctx.message;
// 	const keyboard = Markup.inlineKeyboard([
// 		Markup.button.callback('Нажми меня', `button_pressed_on_message_${message.message_id}`)
// 	]);
// 	ctx.reply('Привет! Нажми кнопку ниже', keyboard);
// }

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
// 		{ reply_markup: keyboard, reply_to_message_id: get.message_id },
// 	);
// 	//  ctx.reply(message,keyboard, { parse_mode: 'HTML' })
// 	ctx.telegram.sendMessage(ctx.message.chat.id, 'Ответ на ваше сообщение', { reply_to_message_id: get.message_id });

// 	// const data = JSON.stringify(ctx); // Строка для записи в файл
// 	// const filePath = './ctx'; // Путь к файлу

// 	// fs.writeFile(filePath, data, (err) => {
// 	//   if (err) throw err;
// 	//   console.log('Данные записаны в файл');
// 	// });

// }
// send2 = send(1293060843)


// function runAsyncFunctionWithInterval() {
// 	// const ctx =  {message: {chat: {id: 1293060843 }}};


// 	setInterval(async () => {
// 		try {
// 		  const data = await fs.promises.readFile('./ctx', 'utf8');
// 		  const ctx = JSON.parse(data);
// 		  const result = await send(ctx);
// 		  console.log(result);
// 		} catch (err) {
// 		  console.error(err);
// 		}
// 	 }, 5000);
// 	}	 



// 	setInterval(async () => {
// 		data =	await fs.readFile('./ctx', 'utf8', (err, data) => {
// 			if (err) {
// 			  console.error(err);
// 			  return;
// 			}
// 			console.log(data);
// return data;
// 		 });
// 		 ctx = await JSON.parse(data); 
// 	  const result = await send(ctx);
// 	  console.log(result);
// 	}, 5000)
//  }
//  runAsyncFunctionWithInterval()

//  bot.command('test', (ctx) => {
// const test = (ctx) => {

// 	// Создаем массивы кнопок для каждой строки
// 	const row1 = [Markup.button.callback('🟡', 'button_yellow')
// 		, Markup.button.callback('👍', 'button1')
// 		, Markup.button.callback('👎', 'button1')
// 		, Markup.button.callback('🔵', 'button1')
// 		, Markup.button.callback('🔵', 'button1')
// 		, Markup.button.callback('🔵type:', 'button1')
// 		, Markup.button.callback('🆘', 's')
// 		, Markup.button.callback('🟢', 'button1')]
// 	const row2 = [Markup.button.callback('❌DELETE', 'delete')
// 		, Markup.button.callback('more_info', 'more_info')]

// 	// Создаем объект клавиатуры с двумя строками кнопок
// 	const keyboard = Markup.inlineKeyboard([row1, row2])
// 	const message = "Hello! What ***would*** <b>you</b> **like** to\n do today?"
// 	ctx.replyWithHTML(message, keyboard)
// }


// // bot.command('get_message',

// const get_message = async (ctx) => {
// 	const chatId = ctx.chat.id;
// 	const messageId = 497; // замените на реальный message_id сообщения



// 		const message = await ctx.telegram.telegramApi.getMessage(chatId, messageId);
// 		console.log(`Текст сообщения: ${message.text}`);

// }




module.exports = {
	handleHelp,
	// handleGetBD,
	// handleSendTest,
	// send,
	// test,

};