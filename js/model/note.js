
import {Utils } from '../util/utils.js';

export class Note {

    finished = null;

    constructor(id, due = Utils.today(), title, importance, text){
        this.id = id;
        this.created = new Date();
        this.due = due;
        this.title = title;
        this.importance = importance;
        this.text = text;
    }

    get finished() {
        return  this.finished ? null : new Date(this.finished);
    }

    finish() {
        this.finished = Utils.today();
    }

}