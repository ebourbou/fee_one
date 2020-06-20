
export class Utils {

    static random() {
        return Math.random() * (1000000 - 1) + 1;
    }

    static today() {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
    }

    static asStringRelativeToToday(date) {
        const asNumber = Date.parse(date);
        if (asNumber) {
            let x = new Date(asNumber);
            const dateDiff = (x.getTime() - Utils.today()) / 86400000;
            if (dateDiff == 0) {
                return "Heute";
            } else if (dateDiff > 0 && dateDiff < 7) {
                return "Nächsten " + Utils.dayName(x.getDay());
            } else if (dateDiff < 0 && dateDiff > -7) {
                return "Letzten " + Utils.dayName(x.getDay());
            } else {
                return x.toLocaleString().split(",")[0];
            }
        }
        return null;
    }

    static dayName(dayNumber) {
        const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
        return weekdays[dayNumber];
    }

    static dateAsDDMMYYYYString(date) {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
}