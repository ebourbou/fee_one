
export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export function today() {
    const now = new Date();
    now.setHours(0,0,0,0);
    return now;
}

export function asStringRelativeToToday(date) {
    const asNumber = Date.parse(date);
    if (asNumber) {
        let x = new Date(asNumber);
        const dateDiff = (x.getTime() - today()) / 86400000;
        if (dateDiff == 0) {
            return "Heute";
        } else if (dateDiff > 0 && dateDiff < 7) {
            return "Nächsten " + dayName(x.getDay());
        } else if (dateDiff < 0 && dateDiff > -7) {
            return "Letzten " + dayName(x.getDay());
        } else {
            return x.toLocaleString().split(",")[0];
        }
    }
    return null;
}

function dayName(dayNumber){
    let dayString = "";
    const weekdays = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
    return weekdays[dayNumber];
}