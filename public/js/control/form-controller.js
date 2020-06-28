import {Note} from "../model/note.js";
import {Utils} from "../../../util/utils.js";

export class FormController {

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
        document.querySelector("form").addEventListener("submit", async (event) => {
            event.preventDefault();
            const title = document.querySelector(".form_title_input").value;
            const text = document.querySelector(".form_text_input").value;
            const due = document.querySelector(".form_due_input").value;
            const importance = document.querySelector('.form_importance_input:checked').value;
            let note = await this.getCurrentOrNewNote();
            note.title = title;
            note.text = text;
            note.due = due;
            note.importance = importance;

            if(note._id == null) {
                await this.#notebookService.addNote(note);
            } else {
                await this.#notebookService.updateNote(note);
            }
            await this.backToIndex();
        });
    }

    registerValidationListeners() {
        const title = document.querySelector(".form_title_input");
        title.addEventListener("invalid", () => {
            if (title.validity.valueMissing || title.validity.tooShort) {
                title.setCustomValidity("Bitte gib einen Titel mit mindestens 3 Zeichen ein!");
            } else {
                title.setCustomValidity("");
            }
        });

        const dueDate = document.querySelector(".form_due_input");
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

    toggleThemeFromSessionStorage() {
        if (sessionStorage.getItem("theme") === "dark") {
            document.body.classList.toggle("dark-theme");
        }
    }

    async init() {
        this.toggleThemeFromSessionStorage();
        document.body.innerHTML = this.#resolveToHTML(await this.getCurrentOrNewNote());
        this.registerValidationListeners();
        this.registerSaveListener();
        this.registerCancelListener();

    }
}
