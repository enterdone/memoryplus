const schedule = require('node-schedule');
const {todayJob}=require('./pg.js');
  
// сначала мне нужно узнать список сообщений
//     * если есть доп настройки по отправке времени
// отправить по каждому сообщению из списка команду
const timer_start = (bot,f) => {
    todayJob
        .then(rows => rows.map(row =>setJobForUser(row.user_id,row.objects,bot,f)))
        .catch(error => {console.error(error)});
}

const setJobForUser = (user_id,messages,bot,f) => {
    let cronTime,hours,minutes, msgTime,date    
   const dayDistanceDemicalHours = 0.5  
   //global.users.dayDistanceDemicalHours //todo
   const  startHourTheDay = 17
   //  startHourTheDay = global.users.startHourTheDay//todo
   const timeZone = 4 + startHourTheDay 
    // timeZone = global.users.timeZone+startHourTheDay//todo
    step = dayDistanceDemicalHours/messages.length

    date = new Date()
    console.log("DATE____",date)
    // date = date.toUTCString()

for(let i=0,j=0; j<dayDistanceDemicalHours; i++,j+=step ){
 console.log(i,"i", j, "j", step,"step",msgTime, "msgTime" )
    // console.log(startHourTheDay,j , "startHourTheDay,j")
    
    msgTime = (dayDistanceDemicalHours+j).toFixed(2)*1
console.log('msgTime',msgTime);
     hours = Math.floor(msgTime).toString()
     demicalMin = msgTime - hours
     minutes = Math.round(demicalMin*60).toString()
     
    //  if (hours<10){hours= "0"+hours}
    //  if (minutes<10){minutes= "0"+minutes}
console.log('hours minutes', hours,minutes);
// console.log(messages[i],daate);

// daate = new Date(`2023-06-02T${hours}:${minutes}:00`)
console.log( "hours", hours , "min", minutes, "timezone", timeZone)

date.setUTCHours(hours+timeZone*1); // Установка часов (14 + 4 = 18)
date.setUTCMinutes(minutes+1); // Установка минут
console.log(date);

schedule.scheduleJob(date, () => {
    console.log(`Running ${minutes}`,hours,date);
    console.log(messages[i])
    f(bot, messages[i].user_id,messages[i].message_id)
    // Ваш код для выполнения задания
  });
  
}}


 
 

// todayJob.then()





// //каждый день в 5 утра происходит запрос на сообщения
  const job = ('0 * * * * *', () => { console.log('Текущее время сервера:', currentTime); });
  job.schedule(); //включает таймер при запуске бота



module.exports = {timer_start}