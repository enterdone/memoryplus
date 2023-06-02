const schedule = require('node-schedule');
const {todayJob}=require('./pg.js');
 
// сначала мне нужно узнать список сообщений
//     * если есть доп настройки по отправке времени
// отправить по каждому сообщению из списка команду
const daily_message_bot = (bot,f) => {
    todayJob
        .then(rows => rows.map(row =>setJobForUser(row.user_id,row.objects,bot,f)))
        .catch(error => {console.error(error)});
}

const setJobForUser = (user_id,messages,bot,f) => {
    let cronTime,hours,minutes, msgTime   

    step = 0.5/messages.length
    startHourTheDay = 1.66

for(let i=0,j=0; j<2; i++,j+=step ){
 
    // console.log(startHourTheDay,j , "startHourTheDay,j")
    msgTime = (startHourTheDay+j).toFixed(2)
// console.log('msgTime',msgTime);


 

     hours = Math.floor(msgTime).toString()
     demicalMin = msgTime - hours
     minutes = Math.round(demicalMin*60).toString()
     
     if (hours<10){hours= "0"+hours}
     if (minutes<10){minutes= "0"+minutes}
console.log('hours minutes', hours,minutes);
daate = new Date(`2023-06-02T${hours}:${minutes}:00`)
// console.log(messages[i],daate);
console.log(daate);

schedule.scheduleJob(daate, () => {
    console.log(`Running ${minutes}`,hours,daate);
    console.log(messages[i])
    f(bot, messages[i].user_id,messages[i].message_id)
    // Ваш код для выполнения задания
  });
  
}}


 
 

// todayJob.then()





// //каждый день в 5 утра происходит запрос на сообщения
// const job = schedule.scheduleJob('* 5 * * *', () => { getMessages(); });
// job.schedule(); //включает таймер при запуске бота



module.exports = {daily_message_bot}