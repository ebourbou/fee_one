
import { uuidv4, today } from './utils.js';

export class Note {

    constructor(due = today(), title, importance, text){
        this.id = uuidv4();
        this.created = new Date();
        this.due = due;
        this.title = title;
        this.importance = importance;
        this.finished = null;
        this.text = text;
    }

    get isFinished() {
        return this.finished ? true : false;
    }

}