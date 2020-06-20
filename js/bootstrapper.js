import {NotebookController} from "./control/notebook-controller.js";
import {NotebookService} from "./model/notebook-service.js";
import {NotebookStorage} from "./data/notebook-storage.js";


class Bootstrapper {
    static start() {
        const notebookStorage = new NotebookStorage();
        const notebookService = new NotebookService(notebookStorage);
        new NotebookController(notebookService).initEventHandlers();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);
