import {Note} from "../model/note.js";
import {today} from "../util/utils.js";

export class NotebookStorage {

    #NOTES_KEY;

    constructor() {
        this.#NOTES_KEY = "notes";
    }

    loadNotes() {
        if (sessionStorage.getItem(this.#NOTES_KEY)) {
            return JSON.parse(sessionStorage.getItem(this.#NOTES_KEY));
        } else {
            return [];
        }
    }

    addNote(newNote) {
        if(this.loadNote(newNote.id)){
            throw new Error("Note exists already!");
        }
        let notes = this.loadNotes();
        notes.push(newNote);
        this.saveNotes(notes);
    }

    updateNote(updatedNote) {
        let notes = this.loadNotes();
        let toBeUpdated = notes.find(n => n.id === updatedNote.id);
        if (!toBeUpdated){
            throw new Error("Note does not exist!");
        } else if (toBeUpdated.finished){
            throw new Error("Note is already finished!");
        } else {
            toBeUpdated.due = updatedNote.due;
            toBeUpdated.title = updatedNote.title;
            toBeUpdated.importance = updatedNote.importance;
            toBeUpdated.text = updatedNote.text;
            if (updatedNote.finished){
                // TODO !!! möchte finish() verwenden, wie macht man aus der note eine Note?
                toBeUpdated.finished = today();
            }
            this.saveNotes(notes);
        }
    }

    loadNote(id){
         return this.loadNotes().find(note => note.id === id);
    }

    saveNotes(notes) {
        sessionStorage.setItem(this.#NOTES_KEY, JSON.stringify(notes));
    }

}