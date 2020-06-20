import {Note} from "../model/note.js";
import {Utils} from "../util/utils.js";

export class NotebookServer {

    #notes = [];

    constructor() {
        this.#notes.push(new Note(1,Utils.dateAsDDMMYYYYString(new Date()), "title1",3,"text1"));
        this.#notes.push(new Note(2, Utils.dateAsDDMMYYYYString(new Date()), "title2",2,"text2"));
    }

    async loadNotes(req, res) {
        return res.json(await this.#notes );
    }

    async loadNote(req, res){
        return res.json(await this.#notes.find(n => n.id == req.params.id));
    }

    async addNote(req, res) {
        if (this.#notes.find(n => n.id == req.body.id)) {
            return res.status = 409;
        } else {
            req.body.id = Utils.random();
            await this.#notes.push(req.body);
        }
    }

    async updateNote(req, res) {
        let existing = this.#notes.find(n => n.id == req.body.id);
        if (!existing) {
            return res.status = 404;
        } else {
            let index = this.#notes.findIndex(n => n.id == req.body.id);
            this.#notes[index] = req.body;
        }
    }

}