import {HttpService} from "../../../util/http-service.js";
import {Note} from "./note.js";

export class NotebookService {

    #httpService;

    constructor() {
        this.#httpService = new HttpService();
    }

    async loadNotes() {
        return await this.#httpService.ajax("GET", "/notebook/notes/");
    }

    async loadNote(_id){
        return await this.#httpService.ajax("GET", `/notebook/note/${_id}`);
    }

    async addNote(note) {
        await this.#httpService.ajax("POST", '/notebook/note/', note);
    }

    async updateNote(note) {
        await this.#httpService.ajax("PUT", `/notebook/note/${note._id}`, note);
    }

    async finishNote(_id){
        let note = Object.assign(new Note, await this.loadNote(_id));
        note.finish();
        await this.updateNote(note);
    }

}
