import {HttpService} from "./http-service.js";
import {Note} from "./note.js";

export class NotebookService {

    #notebookStorage;
    #httpService;

    constructor(notebookStorage) {
        this.#notebookStorage = notebookStorage;
        this.#httpService = new HttpService();
    }

    async loadNotes() {
        return await this.#httpService.ajax("GET", "/notebook/notes/");
        //return this.#notebookStorage.loadNotes();
    }

    async loadNote(id){
        return await this.#httpService.ajax("GET", `/notebook/note/${id}`);
        //return this.#notebookStorage.loadNote(id);
    }

    async addNote(note) {
        await this.#httpService.ajax("POST", '/notebook/note/', note)
    }

    async updateNote(note) {
        await this.#httpService.ajax("PUT", `/notebook/note/${note.id}`, note)
    }

    async finishNote(id){
        let note = Object.assign(new Note, await this.loadNote(id))
        note.finish();
        await this.updateNote(note);
    }

}