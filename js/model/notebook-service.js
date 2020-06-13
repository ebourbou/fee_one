import {today} from "../util/utils.js";

export class NotebookService {

    #notebookStorage;

    constructor(notebookStorage) {
        this.#notebookStorage = notebookStorage;
    }

    loadNotes() {
        return this.#notebookStorage.loadNotes();
    }

    loadNote(id){
        return this.#notebookStorage.loadNote(id);
    }

    addNoteOrUpdateNote(note) {
        if(this.#notebookStorage.loadNote(note.id)) {
            this.#notebookStorage.updateNote(note);
        } else {
            this.#notebookStorage.addNote(note);
        }
    }

    finishNote(id){
        let note = this.#notebookStorage.loadNote(id);
        // TODO !!! möchte finish() verwenden, wie macht man aus der note eine Note?
        //note.finish();
        note.finished = today();
        this.#notebookStorage.updateNote(note);
    }


}