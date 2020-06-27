import {NotebookService} from "./model/notebook-service.js";
import {FormController} from "./control/form-controller.js";


class NoteBootstrapper {
    static start() {
        const notebookService = new NotebookService();
        new FormController(notebookService).init();
    }
}

document.addEventListener('DOMContentLoaded', NoteBootstrapper.start);
