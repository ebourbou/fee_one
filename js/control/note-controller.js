import {Note} from "../model/note.js";
import {Utils} from "../util/utils.js";

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
            this.backToIndex();
        });
    }

    backToIndex() {
        sessionStorage.removeItem("itemId");
        location.href = "index.html";
    }

    registerSaveListener() {
        document.querySelector(".form_submit").addEventListener("click", async (event) => {
            const title = document.querySelector("#title").value;
            const text = document.querySelector("#textArea").value;
            const due = document.querySelector("#due_date").value;
            const importance = document.querySelector('.form_importance_input:checked').value;
            let note = await this.getCurrentOrNewNote();
            note.title = title;
            note.text = text;
            note.due = due;
            note.importance = importance;

            if(note.id == null) {
                this.#notebookService.addNote(note);
            } else {
                this.#notebookService.updateNote(note);
            }

            event.preventDefault();
            this.backToIndex();
        });
    }

    registerValidationListeners() {
        const title = document.getElementById("title");
        document.getElementById("title").addEventListener("input", () => {
            if (title.validity.tooShort) {
                title.setCustomValidity("Das soll eine Notiz sein? Zu kurz! Gib dir Mühe!");
            } else {
                title.setCustomValidity("");
            }
        });

        const dueDate = document.getElementById("due_date");
        dueDate.addEventListener("input", () => {
            if (dueDate.valueAsDate < Utils.today()) {
                dueDate.setCustomValidity("Eine Notiz soll für die Zukunft sein!");
            } else {
                dueDate.setCustomValidity("");
            }
        });
    }

    async getCurrentOrNewNote() {
        let note;
        if (sessionStorage.getItem("itemId")) {
            note = await this.#notebookService.loadNote(sessionStorage.getItem("itemId"));
        } else {
            note = new Note();
        }
        return note;
    }

    async init() {

        if (sessionStorage.getItem("theme") === "night") {
            document.body.classList.toggle("dark-theme");
        }

        Handlebars.registerHelper("ifHigherEqual", function (importance, currentItem) {
            return importance >= currentItem;
        });

        Handlebars.registerHelper("formatDate", function (date) {
            return Utils.dateAsDDMMYYYYString(date);
        });
        document.body.innerHTML = this.#resolveToHTML(await this.getCurrentOrNewNote());


        this.registerValidationListeners();
        this.registerSaveListener();
        this.registerCancelListener();

    }
}