const {Telegraf, Markup, Extra} = require('telegraf');
const axios = require("axios")
const marked = require('marked')

const bot = new Telegraf('6036674449:AAH86LMufrMwf2PbKYhK9VP7X4HDynnC05g')

bot.start(ctx => {
	//Send a message when /start command has executed
	ctx.reply('/start initialized')
	  .then(setTimeout(()=>ctx.reply('test 3000ms'), 3000))
	})
	
console.log("console.log")

// bot.command('test', (ctx) => {
// 	ctx.reply('Choose an option:', Markup.keyboard([
// 	  ['Option 1', 'Option 2'],
// 	  ['Option 3', 'Option 4'],
// 	]).resize().extra())
//  })

 bot.command('test', (ctx) => {
	const keyboard = Markup.inlineKeyboard([
	  Markup.button.url('Google', 'https://www.google.com'),
	  Markup.button.callback('Press me', 'pressed'),
	])
 
	ctx.reply('Hello! What would you like to do today?', keyboard)
 })
	
	






 



 bot.action('button1', (ctx) => {
	ctx.reply('Вы нажали на кнопку "Button 1"')
 })
 
//bot - answer 
bot.on('message', (ctx)=>{

	//  ctx.telegram.sendCopy(ctx.chat.id , ctx.message)
	console.log('bot.on(message', ctx.message.text);
	
	//  Define the keyboard using Markup
	 const keyboard = Markup.inlineKeyboard([
		Markup.button.callback('Button 1', 'button1'),
		Markup.button.callback('Button 2', 'button2'),
	 ])
  
	 // Attach the keyboard to the message using Extra
	//  const extra = Extra.markup(keyboard)

	
const message = marked.parseInline(`
**${ctx.message.text.toUpperCase()}** 

_перевод_:
			 <tg-spoiler>${ctx.message.text}</tg-spoiler>
			 
` )
	 
		  ctx.replyWithHTML(message,keyboard)

	
	}).catch(function (err) {
	
		 console.error(err);
		 
	});
	
	
	 
	








	bot.launch().then(
		console.log("Execute")
		)
		.catch((error) => {
		console.log(error,"ERRROOOOOOOOOORRR");
		})
	