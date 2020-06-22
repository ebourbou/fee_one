import {Utils} from "../../util/utils.js";


Handlebars.registerHelper("asDate", function(date) {
    return Utils.asStringRelativeToToday(date) ;
});

Handlebars.registerHelper("formatDate", function (date) {
    return Utils.dateAsDDMMYYYYString(date);
});

Handlebars.registerHelper('icons', function(importance, block) {
    let concatIcons = "";
    for(let i = 0; i <= importance; ++i)
        concatIcons  = concatIcons + block.fn(i);
    return concatIcons;
});