const schedule = require('node-schedule');
const {todayJob}=require('./pg.js');

const daily_message_bot = (bot,f) => {
    todayJob.then(rows => rows.map(row =>setJobForUser(row.user_id,row.objects,bot,f))).catch(error => {console.error(error)});
}

const setJobForUser = (user_id,messages,bot,f) => {
    let cronTime,hours,minutes, msgTime,date    
   const dayDistanceDemicalHours = 0.5
   const  startHourTheDay = 19.11
   const utc = 4
   const timeZone = - utc + startHourTheDay   

   step = dayDistanceDemicalHours/messages.length
   date = new Date()
   for(let i=0,j=0; j<dayDistanceDemicalHours; i++,j+=step ){

    msgTime = (j).toFixed(2)
    hours = Math.floor(msgTime) 
    demicalMin = msgTime - hours
    minutes = Math.round(demicalMin*60)
    date.setUTCHours(hours+timeZone ); // Установка часов (14 + 4 = 18)
    console.log('hours',hours,'timeZone',timeZone,'demicalMin',demicalMin,'demicalMin',demicalMin);
    
date.setUTCMinutes(minutes ); // Установка минут
console.log(date,i,"i", j, "j", step,"step",msgTime, "msgTime" )


schedule.scheduleJob(date, () => {
    console.log(`Running ${minutes}`,hours,date);
    console.log(messages[i])
    f(bot, messages[i].user_id,messages[i].message_id)
    // Ваш код для выполнения задания
  });
  
}}



module.exports = {daily_message_bot}