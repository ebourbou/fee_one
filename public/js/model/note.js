
import {Utils } from '../../../util/utils.js';

export class Note {

    finished = null;
    _id;
    created = new Date();
    due;
    title;
    importance;
    text;

    get finished() {
        return  this.finished ? null : new Date(this.finished);
    }

    finish() {
        this.finished = Utils.today();
    }

}