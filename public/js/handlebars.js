import {Utils} from "../../util/utils.js";


Handlebars.registerHelper("asDate", function(date) {
    return Utils.asStringRelativeToToday(date) ;
});

Handlebars.registerHelper("formatDate", function (date) {
    return Utils.dateAsDDMMYYYYString(date);
});