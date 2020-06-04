import { getNotes } from  './notebook.js';
import { asStringRelativeToToday } from  './utils.js';


const templateSource = document.getElementById("note-template").innerHTML;
const resolveToHTML = Handlebars.compile(templateSource);

function renderNotes() {
    document.getElementById("items").innerHTML = resolveToHTML(getNotes());
}

function init() {
    document.getElementById("theme").addEventListener("change", () => {
        document.body.classList.toggle("dark-theme");
    });

    Handlebars.registerHelper("asDate", function(date) {
        return asStringRelativeToToday(date) ;
    });
    renderNotes();
}

init();