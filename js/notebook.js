
import {Note} from './note.js';
import {today} from "./utils.js";

const NOTES_KEY = "notes";

export function addOrUpdateNote(newNote) {
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
    addOrUpdateNote(note);
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
    addOrUpdateNote(note)
}

export function loadNote(id){
    return loadNotes().find(note => note.id === id);
}

function initTestData() {
    addOrUpdateNote(new Note(new Date(2020,6,6), "Erste Notiz", 3, "Der Notizentext"));
    addOrUpdateNote(new Note(new Date(2020,5,5), "Zweite Notiz", 2, "Hier steht sonstwas"));

    let note = new Note(new Date(2020,5,3), "Dritte Notiz", 1, "Lorem impsum");
    addOrUpdateNote(note);
    finishNote(note.id);
}

//initTestData();



/*


function compareSongs(s1, s2) {
    return s2.rating - s1.rating;
}

function songsSorted(){
    return [...songs].sort(compareSongs);
}

function findSong(id) {
    return songs.find(song => parseInt(id) === parseInt(song.id));
}

function rateSong(songId, delta) {
    let song = findSong(songId);

    if(song) {
        song.rating += delta;
        return true;
    }
    return false;
}*/
