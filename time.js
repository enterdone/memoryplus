const schedule = require('node-schedule');
const {}=require('pg.js');
сначала мне нужно узнать список сообщений
    * если есть доп настройки по отправке времени

отправить по каждому сообщению из списка команду


// Получаем текущую дату и время
const today = new Date(); 
// Устанавливаем желаемое время без указания даты time.setHours(12, 30)
time.setHours(12, 30); 
// const timezone = 'Europe/Moscow' ||  = '+03:00' ||  f() //TODO



function schedulingMessages(array){ // <---- array = get sql 
    array.forEach(element => {
        // const date = new Date('2023-05-20T09:30:00');     
        schedule.scheduleJob(date, function() {  //TODO DATE GLOBAL 

            // Код для отправки сообщения
            
          });

    });
}







//каждый день в 5 утра происходит запрос на сообщения
const job = schedule.scheduleJob('* 5 * * *', () => { getMessages(); });
job.schedule(); //включает таймер при запуске бота