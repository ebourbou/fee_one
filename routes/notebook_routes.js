import express from 'express';

export class NotebookRoutes {

    static init(notebookServer) {
        const router = express.Router();
        router.get("/notes", notebookServer.loadNotes.bind(notebookServer));
        router.get("/note/:_id/", notebookServer.loadNote.bind(notebookServer));
        router.put("/note/:_id/", notebookServer.updateNote.bind(notebookServer));
        router.post("/note", notebookServer.addNote.bind(notebookServer));
        return router;
    }

}
