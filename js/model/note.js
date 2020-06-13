
import { uuidv4, today } from '../util/utils.js';

export class Note {

    #finished = null;

    constructor(due = today(), title, importance, text){
        this.id = uuidv4();
        this.created = new Date();
        this.due = due;
        this.title = title;
        this.importance = importance;
        this.text = text;
    }

    get finished() {
        return this.#finished;
    }

    set finished(date) {
        // TODO !!! methode sollte nicht nötig sein. möchte finish() verwenden
        this.#finished = today();
    }

    finish() {
        this.#finished = today();
    }

}