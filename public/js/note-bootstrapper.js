import {NotebookService} from "./model/notebook-service.js";
import {FormController} from "./control/form-controller.js";


class NoteBootstrapper {
    static start() {
        new FormController(new NotebookService()).init();
    }
}

document.addEventListener('DOMContentLoaded', NoteBootstrapper.start);
