
import {Note} from './note.js';


let notes = [];

function addNote(note) {
    notes.push(note);
}

function initTestData() {
    addNote(new Note(new Date(2020,6,6), "Erste Notiz", 3, "Der Notizentext"));
    addNote(new Note(new Date(2020,5,5), "Zweite Notiz", 2, "Hier steht sonstwas"));
    addNote(new Note(new Date(2020,5,3), "Dritte Notiz", 1, "Lorem impsum"));
    notes.find(e => e.title.startsWith("Dritte") ).finished = new Date();
}


export function getNotes() {
    return     notes;
}

initTestData();



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
