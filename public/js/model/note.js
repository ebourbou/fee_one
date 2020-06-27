
import {Utils } from '../../../util/utils.js';

export class Note {

    finished = null;
    _id;
    created = new Date();
    due;
    title;
    importance = 0;
    text;

    finish() {
        this.finished = Utils.today();
    }

}
