import Datastore from 'nedb-promise'

export class NotebookStore {
    constructor() {
        this.db = new Datastore({filename: './data/notebook.db', autoload: true});
    }

    async add(note) {
        return await this.db.insert(note);
    }

    async update(note) {
        return await this.db.update({_id: note._id}, note);
    }

    async get(_id) {
        return this.db.findOne({_id: _id});
    }

    async all() {
        //return await this.db.cfind({orderedBy : created}).sort({ orderDate: -1 }).exec();
        return await this.db.find({});
    }
}
