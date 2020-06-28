import {NotebookController} from "./control/notebook-controller.js";
import {NotebookService} from "./model/notebook-service.js";


class NotebookBootstrapper {
    static start() {
        new NotebookController(new NotebookService()).init();
    }
}

document.addEventListener('DOMContentLoaded', NotebookBootstrapper.start);
