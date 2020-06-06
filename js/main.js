import { loadNotes } from  './notebook.js';
import { asStringRelativeToToday } from  './utils.js';


const templateSource = document.getElementById("note-template").innerHTML;
const resolveToHTML = Handlebars.compile(templateSource);

function renderNotes() {
    document.getElementById("items").innerHTML = resolveToHTML(loadNotes());
}

function init() {

    registerThemeListener();

    Handlebars.registerHelper("asDate", function(date) {
        return asStringRelativeToToday(date) ;
    });

    registerEditListener();
    renderNotes();
}

function registerThemeListener() {
    document.getElementById("theme").addEventListener("change", () => {
        sessionStorage.setItem("theme", document.getElementById("theme").value);
        document.body.classList.toggle("dark-theme");
    });
}

function registerEditListener() {
    document.getElementById("items").addEventListener("click", (event) => {
            const itemId = event.target.closest(".item").dataset.id;
            sessionStorage.setItem("itemId", itemId);
            console.log(itemId);
        }
    )
}

init();