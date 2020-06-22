import {NotebookController} from "./control/notebook-controller.js";
import {NotebookService} from "./model/notebook-service.js";


class Bootstrapper {
    static start() {
        const notebookService = new NotebookService();
        new NotebookController(notebookService).init();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);
