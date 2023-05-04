async function formatMessageText(message) {
	let formattedText = message.text;
	if (message.entities) {
	  for (const entity of message.entities) {
		 if (entity.type === 'bold') {
			formattedText = formattedText.slice(0, entity.offset) + '*' + formattedText.slice(entity.offset, entity.offset + entity.length) + '*' + formattedText.slice(entity.offset + entity.length);
		 } else if (entity.type === 'italic') {
			formattedText = formattedText.slice(0, entity.offset) + '_' + formattedText.slice(entity.offset, entity.offset + entity.length) + '_' + formattedText.slice(entity.offset + entity.length);
		 } else if (entity.type === 'underline') {
			formattedText = formattedText.slice(0, entity.offset) + '__' + formattedText.slice(entity.offset, entity.offset + entity.length) + '__' + formattedText.slice(entity.offset + entity.length);
		 }
	  }
	}
	return formattedText;
 }

//  const formattedText = await formatMessageText(ctx.message);
//  console.log(formattedText);

 module.exports = {formatMessageText}