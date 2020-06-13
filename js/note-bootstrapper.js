import {NotebookService} from "./model/notebook-service.js";
import {NotebookStorage} from "./data/notebook-storage.js";
import {NoteController} from "./control/note-controller.js";


class NoteBootstrapper {
    static start() {
        const notebookStorage = new NotebookStorage();
        const notebookService = new NotebookService(notebookStorage);
        new NoteController(notebookService).init();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', NoteBootstrapper.start);
