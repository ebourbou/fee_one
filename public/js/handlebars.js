import {Utils} from "../../util/utils.js";


Handlebars.registerHelper("asDate", function(date) {
    return Utils.asStringRelativeToToday(date) ;
});

Handlebars.registerHelper("formatDate", function (date) {
    return Utils.dateAsDDMMYYYYString(date);
});

Handlebars.registerHelper('showStars', function(importance, block) {
    let concatIcons = "";
    for(let i = 0; i <= importance; ++i)
        concatIcons  = concatIcons + "&#9733";
    return concatIcons;
});

Handlebars.registerHelper ("setChecked", function (value, currentValue) {
    if ( value == currentValue ) {
        return "checked";
    } else {
        return "";
    }
});
