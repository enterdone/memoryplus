const schedule = require('node-schedule');
const {todayJob}=require('./pg.js');
// сначала мне нужно узнать список сообщений
//     * если есть доп настройки по отправке времени

// отправить по каждому сообщению из списка команду
const daily_message_bot = ()=> {

    
    todayJob
    .then(rows => { console.log(rows)
        // обработка результатов из запроса
// const uniqueIds =  new Set(rows.map(obj => obj.user_id)) ;
// uniqueIds.forEach(user_id => {
    
// });
 
        // console.log(rows);
    })
    .catch(error => {
        // обработка ошибок
        console.error(error);
    });
    
}
 
// // Получаем текущую дату и время
// const today = new Date(); 
// // Устанавливаем желаемое время без указания даты time.setHours(12, 30)
// time.setHours(12, 30); 
// // const timezone = 'Europe/Moscow' ||  = '+03:00' ||  f() //TODO



// function schedulingMessages(rows){ // <---- array = get sql 
//     array.forEach(row => {
//         // const date = new Date('2023-05-20T09:30:00');     
//         schedule.scheduleJob(date, function() {  //TODO DATE GLOBAL 

//             // Код для отправки сообщения
            
//           });

//     });
// }

// todayJob.then()





// //каждый день в 5 утра происходит запрос на сообщения
// const job = schedule.scheduleJob('* 5 * * *', () => { getMessages(); });
// job.schedule(); //включает таймер при запуске бота



module.exports = {daily_message_bot}