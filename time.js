const schedule = require('node-schedule');
const {todayJob}=require('./pg.js');

//TODO => when bot start & id settings changed SQL
 const timeDb = {
     "2252839": { dayDistance: 12 },
     "424244": { dayDistance: 8 }
     ,1293060843 : { dayDistance: 8 }
   };

const timer_start = (bot,f) =>{
    const job = schedule.scheduleJob('* 1 * * *', () => { 
        server_notification = `База полученна
        Текущее время сервера: ${new Date()}`     
    console.log(server_notification);

    bot.telegram.sendMessage(472758383,server_notification ) ;
    console.log('time.js timer_start');
    timer_planning(bot,f);
                                });}
     


const timer_planning = (bot,f) => {
    todayJob.then(rows => rows.map(row =>
        setJobForUser(row.user_id, row.objects ,bot ,f )
        )).catch(error => {console.error(error)});
}





const setJobForUser = (user_id, messages, bot, f) => {
    let cronTime,hours,minutes, msgTime,date    
    console.log('user_id:', user_id);
    
    // const dayDistanceDemicalHours = timeDb[user_id] && timeDb[user_id].dayDistance ? timeDb[user_id].dayDistance : 12;

   const dayDistanceDemicalHours = timeDb[user_id]?.dayDistance ||    12
//    const dayDistanceDemicalHours =     12
console.log(dayDistanceDemicalHours);

   const  startHourTheDay =   11
   console.log(dayDistanceDemicalHours, startHourTheDay)
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


 
module.exports = {timer_start, }