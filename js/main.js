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

    registerSortByCreated();
    registerSortByFinish();
    registerSortByImportance();
    registerFilterByFinished();
    registerCreateNewNoteListener();
    registerEditListener();
    registerFinishListener();

    loadSortAndRenderByCreated();

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
            finishNote(event.target.closest(".item").dataset.id);
            renderNotes(loadNotes());
        }
    })
}

function registerSortByFinish() {
    document.querySelector(".command.sorter.finish").addEventListener("click", (event) => {
        toggleSorters(false, true, false);
        let notes = loadNotes();
        notes.sort((a, b) => {
            let left = isNaN(Date.parse(a.finished)) ? -1 : Date.parse(a.finished);
            let right = isNaN(Date.parse(b.finished)) ? -1 : Date.parse(b.finished);
            return right - left ;
        });
        renderNotes(notes);
    });
}

function registerSortByImportance() {
    document.querySelector(".command.sorter.importance").addEventListener("click", (event) => {
        toggleSorters(false, false, true);
        let notes = loadNotes();
        notes.sort((a, b) => b.importance - a.importance);
        renderNotes(notes);
    });
}

function toggleSorters(created, finish, importance){
    document.querySelector(".command.sorter.created").classList.toggle("button_selected",created);
    document.querySelector(".command.sorter.finish").classList.toggle("button_selected",finish);
    document.querySelector(".command.sorter.importance").classList.toggle("button_selected",importance);
}

function loadSortAndRenderByCreated() {
    toggleSorters(true, false, false);
    let notes = loadNotes();
    notes.sort((a, b) => new Date(a.created) - new Date(b.created));
    renderNotes(notes);
}

function registerSortByCreated() {
    document.querySelector(".command.sorter.created").addEventListener("click", (event) => {
        loadSortAndRenderByCreated();
    });
}

function registerFilterByFinished() {
    document.querySelector(".command.filter").addEventListener("click", (event) => {
        let notes = loadNotes();
        if (!document.querySelector(".command.filter").classList.toggle("button_selected")) {
            notes.filter((note) => !note.finished );
        }
        renderNotes(notes);
    })
}

init();