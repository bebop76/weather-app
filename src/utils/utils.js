//Utilità di sistema

export const fetchDate = () => {
    let now = new Date();
    let date = now.getDate();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let day = days[ now.getDay() ];
    let month = months[ now.getMonth() ];
    return `${day} ${date}, ${month}`
}

export const fetchTime = () => {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let amorpm = hours >= 12 ? 'p.m.' : 'a.m.'
    hours %= 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0'+minutes : minutes
    let strTime = `${hours}:${minutes} ${amorpm}`
    return strTime
} 