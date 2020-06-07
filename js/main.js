import { loadNotes, finishNote } from  './notebook.js';
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

    renderNotes();
    registerCreateNewNoteListener();
    registerEditListener();
    registerFinishListener();

}

function registerThemeListener() {
    document.getElementById("theme").addEventListener("change", () => {
        sessionStorage.setItem("theme", document.getElementById("theme").value);
        document.body.classList.toggle("dark-theme");
    });
}

function registerCreateNewNoteListener() {
    document.querySelector(".create").addEventListener("click", () => {
        sessionStorage.removeItem("itemId");
    });
}

function registerEditListener() {
    document.getElementById("items").addEventListener("click", (event) => {
            const itemId = event.target.closest(".item").dataset.id;
            sessionStorage.setItem("itemId", itemId);
        }
    )
}

function registerFinishListener() {
    document.querySelector(".item_finished").addEventListener("click", (event) => {
            finishNote(event.target.closest(".item").dataset.id)
            renderNotes();
        }
    )
}

init();