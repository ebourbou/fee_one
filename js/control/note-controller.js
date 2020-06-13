import {Note} from "../model/note.js";
import {today} from "../util/utils.js";

export class NoteController {

    #resolveToHTML;
    #notebookService;

    constructor(notebookService) {

        this.#resolveToHTML = Handlebars.compile(document.getElementById("new-note-template").innerHTML);
        this.#notebookService = notebookService;
    }

    registerCancelListener() {
        document.querySelector(".form_cancel").addEventListener("click", (event) => {
            event.preventDefault();
            backToIndex();
        });
    }

    backToIndex() {
        sessionStorage.removeItem("itemId");
        location.href = "index.html";
    }

    registerSaveListener() {

        document.querySelector(".form_submit").addEventListener("click", (event) => {
            const title = document.querySelector("#title").value;
            const text = document.querySelector("#textArea").value;
            const due = document.querySelector("#due_date").value;
            const importance = document.querySelector('.form_importance_input:checked').value;

            let note = this.getCurrentOrNewNote();
            note.title = title;
            note.text = text;
            note.due = due;
            note.importance = importance;

            this.#notebookService.addNoteOrUpdateNote(note);
            event.preventDefault();
            this.backToIndex();
        });
    }


    registerValidationListeners() {
        const title = document.getElementById("title");
        document.getElementById("title").addEventListener("input", (event) => {
            if (title.validity.tooShort) {
                title.setCustomValidity("Das soll eine Notiz sein? Zu kurz! Gib dir Mühe!");
            } else {
                title.setCustomValidity("");
            }
        });

        const dueDate = document.getElementById("due_date");
        dueDate.addEventListener("input", (event) => {
            if (dueDate.valueAsDate < today()) {
                dueDate.setCustomValidity("Eine Notiz soll für die Zukunft sein!");
            } else {
                dueDate.setCustomValidity("");
            }
        });
    }

    getCurrentOrNewNote() {
        let note;
        if (sessionStorage.getItem("itemId")) {
            note = this.#notebookService.loadNote(sessionStorage.getItem("itemId"));
        } else {
            note = new Note();
        }
        return note;
    }

    init() {

        if (sessionStorage.getItem("theme") === "night") {
            document.body.classList.toggle("dark-theme");
        }

        Handlebars.registerHelper("ifHigherEqual", function (importance, currentItem) {
            return importance >= currentItem;
        });

        Handlebars.registerHelper("formatDate", function (date) {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        });
        document.body.innerHTML = this.#resolveToHTML(this.getCurrentOrNewNote());


        this.registerValidationListeners();
        this.registerSaveListener();
        this.registerCancelListener();

    }
}