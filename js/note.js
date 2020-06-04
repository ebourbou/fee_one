
import { uuidv4, today } from './utils.js';

export class Note {

    constructor(due, title, importance, text){
        this.id = uuidv4();
        this.due = due;
        this.title = title;
        this.importance = importance;
        this._finishedDate = null;
        this.text = text;
    }

    set finished(date) {
        if (this._finishedDate) {
            throw new Error("Already finished!");
        }
        this._finishedDate = date;
        this._finishedDate.setHours(0,0,0,0)
    }

    get finished() {
        return this._finishedDate;
    }

    get isFinished() {
        return this._finishedDate ? true : false;
    }

}