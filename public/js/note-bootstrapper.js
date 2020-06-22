import {NotebookService} from "./model/notebook-service.js";
import {NoteController} from "./control/note-controller.js";


class NoteBootstrapper {
    static start() {
        const notebookService = new NotebookService();
        new NoteController(notebookService).init();
    }
}

document.addEventListener('DOMContentLoaded', NoteBootstrapper.start);
