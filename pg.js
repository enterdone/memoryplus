const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: '0258',
  port: 5432,
});

client.connect();

client.query('SELECT * FROM messages', (err, res) => {
  if (err) throw err;

  // Обработка результатов выборки
  const rows = res.rows;

  // Отправка сообщений пользователям в Telegram
  rows.forEach((row) => {
    const chatId = row.chat_id;
    const message = row.message;

    bot.telegram.sendMessage(chatId, message);
  });

  client.end();
});



// module.exports = getUsers;
