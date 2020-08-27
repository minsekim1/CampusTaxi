export function timetoint(time) { // yes using
    let result = time.replace(/[^0-9]/g,"");
    return (Number)(result);
}

export function hourandminute(dateText) { // yes using
    let localDate = new Date(dateText);
    return localDate.getHours() + "" + localDate.getMinutes();
}

export function getGlobalTimeHourandMinute(hour, min) { // no using
    return hour + "" + min;
}