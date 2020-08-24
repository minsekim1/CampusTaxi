export function getGlobalTimeHour(dateText) {
    let localDate = new Date(dateText);
    return localDate.getHours;
}

export function getGlobalTimeMinute(dateText) {
    let localDate = new Date(dateText);
    return localDate.getMinutes;
}

export function getGlobalTimeHourandMinute(hour, min) {
    return hour + "" + min;
}