const schedule = require('node-schedule');
const { todayJob } = require('./pg.js');

//TODO => when bot start & id settings changed SQL
const timeDb = {
    "2252839": { dayDistance: 12 },
    "424244": { dayDistance: 8 },
    1293060843: { dayDistance: 3, startHourTheDay: 17 },
    472758383: { dayDistance: 10, startHourTheDay: 18 }
};

const timer_start = (bot, f) => {
    server_notification = 'База полученна \n  Текущее время сервера:\n' + new Date()
    var switchT = 0
    const job = schedule.scheduleJob('0 0 0 * * *', () => {
        console.log('time.js timer_start');
        console.log(server_notification);
        bot.telegram.sendMessage(472758383, server_notification);
        if (switchT) { timer_planning(bot, f); }
    });

    (function(){
        timer_planning(bot, f)
        switchT = 1
        bot.telegram.sendMessage(472758383, "🤪база запущенна перманентно,не будет второй запуск в 00:00 (-3)" + server_notification); })();

    console.log("switchT: ",switchT);
        
        
}// 1 time when servers start (test)



const timer_planning = (bot, f) => {
    console.log("timer_planning")
    todayJob.then(rows => {
        console.log("rows")
        console.dir(rows[0])
        rows.map(row => setJobForUser(row.user_id, row.objects, bot, f)
        )
    }).catch(error => { console.error(error) });
}





const setJobForUser = (user_id, messages, bot, f) => {
    console.log('setJobForUser');

    let cronTime, hours, minutes, msgTime, date
    console.log('user_id:', user_id);

    // const dayDistanceDemicalHours = timeDb[user_id] && timeDb[user_id].dayDistance ? timeDb[user_id].dayDistance : 12;

    const dayDistanceDemicalHours = timeDb[user_id]?.dayDistance || 12
    //    const dayDistanceDemicalHours =     12
    console.log(dayDistanceDemicalHours);

    const startHourTheDay = timeDb[user_id]?.startHourTheDay || 9
    console.log(dayDistanceDemicalHours, startHourTheDay)
    const utc = 4
    const timeZone = - utc - 1 + startHourTheDay // 

    step = dayDistanceDemicalHours / messages.length
    date = new Date()
    for (let i = 0, j = 0; j < dayDistanceDemicalHours; i++, j += step) {

        msgTime = (j).toFixed(2)
        hours = Math.floor(msgTime)
        demicalMin = msgTime - hours
        minutes = Math.round(demicalMin * 60)
        date.setUTCHours(hours + timeZone); // Установка часов (14 + 4 = 18)
        console.log('hours', hours, 'timeZone', timeZone, 'demicalMin', demicalMin, 'demicalMin', demicalMin);

        date.setUTCMinutes(minutes); // Установка минут
        console.log(date, i, "i", j, "j", step, "step", msgTime, "msgTime")


        schedule.scheduleJob(date, () => {
            console.log(`Running ${minutes}`, hours, date);
            console.log(messages[i])
            try {
                f(bot, messages[i].user_id, messages[i].message_id)
            } catch (err) { console.log(err); }
            // Ваш код для выполнения задания
        });

    }
}



module.exports = { timer_start, }