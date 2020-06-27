import {Note} from "../public/js/model/note.js";
import {Utils} from "../util/utils.js";

export class NotebookServer {

    #store;

    constructor(store) {
        this.#store = store;
    }

    async loadNotes(req, res) {
        return res.json(await this.#store.all() );
    }

    async loadNote(req, res){
        return res.json(await this.#store.get(req.params._id));
    }

    async addNote(req, res) {
        if (await this.#store.get(req.body._id)) {
            return res.status = 409;
        } else {
            await this.#store.add(req.body);
        }
        res.end();
    }

    async updateNote(req, res) {
        if (! await this.loadNote(req, res)) {
            return res.status = 404;
        } else {
            await this.#store.update(req.body);
        }
        res.end();
    }

}
