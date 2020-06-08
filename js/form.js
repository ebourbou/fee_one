import {loadNote, addOrReplaceNote} from "./notebook.js";
import {Note} from "./note.js";
import {today} from "./utils.js";

const templateSource = document.getElementById("new-note-template").innerHTML;
const resolveToHTML = Handlebars.compile(templateSource);

function registerCancelListener() {
    document.querySelector(".form_cancel").addEventListener("click", (event) => {
        event.preventDefault();
        backToIndex();
    });
}

function backToIndex() {
    sessionStorage.removeItem("itemId");
    location.href = "index.html";
}

function registerSaveListener() {

        document.querySelector(".form_submit").addEventListener("click", (event) => {
            const title = document.querySelector("#title").value;
            const text = document.querySelector("#textArea").value;
            const due = document.querySelector("#due_date").value;
            const importance = document.querySelector('.form_importance_input:checked').value;

            let note = getCurrentOrNewNote();
            note.title = title;
            note.text = text;
            note.due = due;
            note.importance = importance;

            addOrReplaceNote(note);
            event.preventDefault();
            backToIndex();
        });
}


function registerValidationListeners() {
    const title = document.getElementById("title");
    document.getElementById("title").addEventListener("input", (event) => {
        if (title.validity.tooShort){
            title.setCustomValidity("Das soll eine Notiz sein? Zu kurz! Gib dir Mühe!");
        } else {
            title.setCustomValidity("");
        }
     });

    const dueDate = document.getElementById("due_date");
    dueDate.addEventListener("input", (event) => {
        if (dueDate.valueAsDate < today()){
            dueDate.setCustomValidity("Eine Notiz soll für die Zukunft sein!");
        } else {
            dueDate.setCustomValidity("");
        }
    });
}

function getCurrentOrNewNote() {
    let note;
    if (sessionStorage.getItem("itemId")) {
        note = loadNote(sessionStorage.getItem("itemId"));
    } else {
        note = new Note();
    }
    return note;
}

function init() {

    if (sessionStorage.getItem("theme") === "night"){
        document.body.classList.toggle("dark-theme");
    }

    Handlebars.registerHelper("ifHigherEqual", function(importance, currentItem) {
        return importance >= currentItem ;
    });

    Handlebars.registerHelper("formatDate", function(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');    });
    document.body.innerHTML = resolveToHTML(getCurrentOrNewNote());


    registerValidationListeners();
    registerSaveListener();
    registerCancelListener();

}

init();
