import { asStringRelativeToToday, today } from '../util/utils.js';

export class NotebookController {

    #resolveToHTML;
    #notebookService;
    #itemsElement;

    constructor(notebookService) {

        this.#resolveToHTML = Handlebars.compile(document.getElementById("note-template").innerHTML);
        this.#itemsElement = document.getElementById("items");

        this.#notebookService = notebookService;
    }

    renderNotes(notes){
        this.#itemsElement.innerHTML = this.#resolveToHTML(notes);
    }

    initEventHandlers() {

        this.registerThemeListener();

        Handlebars.registerHelper("asDate", function(date) {
            return asStringRelativeToToday(date) ;
        });

        this.registerSortByCreated();
        this.registerSortByFinish();
        this.registerSortByImportance();
        this.registerFilterByFinished();
        this.registerCreateNewNoteListener();
        this.registerEditListener();
        this.registerFinishListener();

        this.loadSortAndRenderByCreated();

    }

    registerThemeListener() {
        document.getElementById("theme").addEventListener("change", () => {
            sessionStorage.setItem("theme", document.getElementById("theme").value);
            document.body.classList.toggle("dark-theme");
        });
    }

    registerCreateNewNoteListener() {
        document.querySelector(".create").addEventListener("click", () => {
            sessionStorage.removeItem("itemId");
        });
    }

    registerEditListener() {
        document.querySelector("#items").addEventListener("click", (event) => {
                const itemId = event.target.closest(".item").dataset.id;
                sessionStorage.setItem("itemId", itemId);
            }
        )
    }

    registerFinishListener() {
        document.querySelector("#items").addEventListener("click", (event) => {
            if (event.target.type = "checkbox"){
                this.#notebookService.finishNote(event.target.closest(".item").dataset.id);
            }
            this.renderNotes(this.#notebookService.loadNotes());
        });
    }

    registerSortByFinish() {
        document.querySelector(".command.sorter.finish").addEventListener("click", (event) => {
            this.toggleSorters(false, true, false);
            let notes = this.#notebookService.loadNotes();
            notes.sort((a, b) => {
                let left = isNaN(Date.parse(a.finished)) ? -1 : Date.parse(a.finished);
                let right = isNaN(Date.parse(b.finished)) ? -1 : Date.parse(b.finished);
                return right - left ;
            });
            this.renderNotes(notes);
        });
    }

    registerSortByImportance() {
        document.querySelector(".command.sorter.importance").addEventListener("click", (event) => {
            this.toggleSorters(false, false, true);
            let notes = this.#notebookService.loadNotes();
            notes.sort((a, b) => b.importance - a.importance);
            this.renderNotes(notes);
        });
    }

    toggleSorters(created, finish, importance){
        document.querySelector(".command.sorter.created").classList.toggle("button_selected",created);
        document.querySelector(".command.sorter.finish").classList.toggle("button_selected",finish);
        document.querySelector(".command.sorter.importance").classList.toggle("button_selected",importance);
    }

    loadSortAndRenderByCreated() {
        this.toggleSorters(true, false, false);
        let notes = this.#notebookService.loadNotes();
        notes.sort((a, b) => new Date(a.created) - new Date(b.created));
        this.renderNotes(notes);
    }

    registerSortByCreated() {
        document.querySelector(".command.sorter.created").addEventListener("click", (event) => {
            this.loadSortAndRenderByCreated();
        });
    }

    registerFilterByFinished() {
        document.querySelector(".command.filter").addEventListener("click", (event) => {
            let notes = this.#notebookService.loadNotes();
            if (!document.querySelector(".command.filter").classList.toggle("button_selected")) {
                notes.filter((note) => !note.finished );
            }
            this.renderNotes(notes);
        })
    }

}