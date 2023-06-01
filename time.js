// const schedule = require('node-schedule');
// const {todayJob}=require('./pg.js');
// const sendMessage = require('./send_message.js')
import { sendMessageMain } from './main.js'
// const {  Telegraf  } = require('telegraf');
// bot.telegram.sendMessage(472758383, "472758383");
//  sendMessage(bot,"472758383", "1606")
// сначала мне нужно узнать список сообщений
//     * если есть доп настройки по отправке времени
sendMessageMain(472758383,"1606")
// // отправить по каждому сообщению из списка команду
// const daily_message_bot = () => {
//     todayJob
//         .then(rows => rows.map(row =>setJobForUser(row)))
//         .catch(error => {console.error(error)});
// }

// const setJobForUser = ({user_id, objects:messages}) => {
//     let cronTime,hours,minutes, msgTime   
//     // console.log(user_id, messages.length)
//     step = 2/messages.length
//     startHourTheDay = 1

// for(let i=0,j=0; j<2; i++,j+=step ){
//     // schedule.scheduleJob(`${(startHourTheDay+j).toFixed(0)} ${startHourTheDay}`, task.handler)
//     console.log(startHourTheDay,j , "startHourTheDay,j")
//     msgTime = (startHourTheDay+j).toFixed(2)
// console.log('msgTime',msgTime);


//     // msgTime =
//     //  msgTime[0].concat(".",
//     //  ().toFixed(0))

//      hours = Math.floor(msgTime)
//      demicalMin = msgTime - hours
//      minutes = Math.round(demicalMin*60)
// console.log('hours minutes', hours,minutes);
// console.log(messages[i]);

// schedule.scheduleJob(new Date(`2023-06-01T${hours}:${minutes}:00`), () => {
//     console.log(`Running ${task.name}`);
//     messages[i]
//     // Ваш код для выполнения задания
//   });
  
// }}


 
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



// module.exports = {daily_message_bot}