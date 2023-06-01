const schedule = require('node-schedule');
const {todayJob}=require('./pg.js');
// сначала мне нужно узнать список сообщений
//     * если есть доп настройки по отправке времени

// отправить по каждому сообщению из списка команду
const daily_message_bot = () => {
    todayJob
        .then(rows => rows.map(row =>setJobForUser(row)))
        .catch(error => {
            // обработка ошибок
            console.error(error);
        });
}

const setJobForUser = ({user_id, objects:messages}) => {
    console.log(user_id, messages.length)
    step = 12/messages.length
    startHourTheDay = 8
    let time 
    let hours  
    let min  

for(let i=0,j=0; j<12; i++,j+=step ){
    // schedule.scheduleJob(`${(startHourTheDay+j).toFixed(0)} ${startHourTheDay}`, task.handler)
    time = moment((startHourTheDay+j).toFixed(2), 'H.m')
    hours = time.format('H')
    min = time.format('mm')

    console.log((startHourTheDay+j).toFixed(2),i,messages.length,hours,min )
 
}
};

 
// const setJobs = rows => rows.forEach(({user_id, msg_obj}) => );
// const setJobs2 = (user_id, msg_obj) => msg_obj.forEach()
// const setJobs = ()
// // function setJobs(rows){
//     rows.forEach(
//          ({ user_id, objects }) => setJobs(user_id, objects)
//     )
//     arr.forEach(msg => {
//         console.log(user_id,msg)        
//     });
// }
 
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