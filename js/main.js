import { loadNotes, finishNote } from  './notebook.js';
import { asStringRelativeToToday } from  './utils.js';


const templateSource = document.getElementById("note-template").innerHTML;
const resolveToHTML = Handlebars.compile(templateSource);

function renderNotes(notes) {
    document.getElementById("items").innerHTML = resolveToHTML(notes);
}

function init() {

    registerThemeListener();

    Handlebars.registerHelper("asDate", function(date) {
        return asStringRelativeToToday(date) ;
    });

    renderNotes(loadNotes());
    registerCreateNewNoteListener();
    registerEditListener();
    registerFinishListener();
    registerSortingListener();
    registerFilteringListener();

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
    document.querySelector("#items").addEventListener("click", (event) => {
            const itemId = event.target.closest(".item").dataset.id;
            sessionStorage.setItem("itemId", itemId);
        }
    )
}

function registerFinishListener() {
    document.querySelector("#items").addEventListener("click", (event) => {
        if (event.target.type = "checkbox"){
            finishNote(event.target.closest(".item").dataset.id)
            renderNotes(loadNotes());
        }
    })
}

function registerSortingListener() {
    document.querySelector(".controls").addEventListener("click", (event) => {
        let notes = loadNotes();
        if (event.target.classList.contains("created")) {
            notes.sort((a, b) => a.created - b.created);
        } else if (event.target.classList.contains("finish")) {
            notes.sort((a, b) => b.finish - a.finish);
        } else if (event.target.classList.contains("importance")) {
            notes.sort((a, b) => b.importance - a.importance);
        }
        renderNotes(notes);
    })
}

function registerFilteringListener() {
    document.querySelector(".controls").addEventListener("click", (event) => {
        let notes = loadNotes();
        if (event.target.classList.contains("filter")) {
            notes.filter((note) => !note.isFinished)
        }
        renderNotes(notes);
    })
}

init();