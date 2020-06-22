import express from 'express';
const router = express.Router();

import {NotebookServer} from "../server/notebook-server.js";
import {NotebookStore} from "../data/notebook-store.js";

const server = new NotebookServer(new NotebookStore());

router.get("/notes", server.loadNotes.bind(server));
router.get("/note/:_id/", server.loadNote.bind(server));
router.put("/note/:_id/", server.updateNote.bind(server));
router.post("/note", server.addNote.bind(server));

export const notebookRoutes = router;