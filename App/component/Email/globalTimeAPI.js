

export function timetoint(time) { // yes using
    let result = time.replace(/[^0-9]/g,"");
    return (Number)(result);
}

export function hourandminute(dateText) { // yes useing
    let localDate = new Date(dateText);
    return localDate.getHours() + "" + localDate.getMinutes();
}

export function getGlobalTimeHourandMinute(hour, min) { // no useing
    return hour + "" + min;
}