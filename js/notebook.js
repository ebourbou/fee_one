
import {Note} from './note.js';
import {today} from "./utils.js";

const NOTES_KEY = "notes";

export function addOrReplaceNote(newNote) {
    let notes = loadNotes();
    let indexExisting = notes.findIndex(n => n.id === newNote.id);
    if (indexExisting != -1){
        notes[indexExisting] = newNote;
    } else {
        notes.push(newNote);
    }
    sessionStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function updateNote(id, due, title, importance, text){
    let note = loadNote(id);
    note.due = due;
    note.title = title;
    note.importance = importance;
    note.text = text;
    addOrReplaceNote(note);
}

export function loadNotes() {
    if (sessionStorage.getItem(NOTES_KEY)) {
        return JSON.parse(sessionStorage.getItem(NOTES_KEY));
    } else {
        return [];
    }
}

export function finishNote(id){
    let note = loadNote(id);
    note.finished = today();
    addOrReplaceNote(note)
}

export function loadNote(id){
    return loadNotes().find(note => note.id === id);
}

function initTestData() {
    addOrReplaceNote(new Note(new Date(2020,6,6), "Erste Notiz", 3, "Der Notizentext"));
    addOrReplaceNote(new Note(new Date(2020,5,5), "Zweite Notiz", 2, "Hier steht sonstwas"));

    let note = new Note(new Date(2020,5,3), "Dritte Notiz", 1, "Lorem impsum");
    addOrReplaceNote(note);
    finishNote(note.id);
}

//initTestData();