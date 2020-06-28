
export class Utils {

    static today() {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
    }

    static asStringRelativeToToday(date) {

        const todayAsDayNumber = Math.round(Date.parse(this.dateAsDDMMYYYYString(Utils.today())) / (1000*60*60*24));
        const inputAsDayNumber = Math.round(Date.parse(date) / (1000*60*60*24));
        const dateDiff = (inputAsDayNumber - todayAsDayNumber ) ;
        if (dateDiff === 0) {
            return "Heute";
        } else if (dateDiff > 0 && dateDiff < 7) {
            return "Nächsten " + (Utils.dayName(Math.abs(dateDiff)));
        } else if (dateDiff < 0 && dateDiff > -7) {
            return "Letzten " + Utils.dayName(Math.abs(dateDiff));
        } else {
            return new Date(Date.parse(date)).toLocaleString().split(",")[0];
        }

    }

    static dayName(dayNumber) {
        const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
        return weekdays[dayNumber];
    }

    static dateAsDDMMYYYYString(date) {
        let d;
        d = date ? new Date(date) : this.today();
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
