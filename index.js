import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {NotebookServer} from './server/notebook-server.js';
import {NotebookStore} from "./data/notebook-store.js";


const app = express();
const router = express.Router();
const server = new NotebookServer(new NotebookStore());

// middlewares
function notFound(req,res, next) {
    res.setHeader("Content-Type", 'text/html');
    res.status(404).send("Confound it all!  We could not find ye's page! ")
}

function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).end(err.message);
}

function myDummyLogger( options ){
    options = options ? options : {};

    return function myInnerDummyLogger(req, res, next)
    {
        console.log(req.method +":"+ req.url);
        console.log(res.body);

        next();
    }
}

//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(require("method-override")(methodOverride));
app.use(router);
//app.use(express.static(__dirname + '/public'));
app.use(notFound);
app.use(errorHandler);

router.all("/*", myDummyLogger());
//router.get("/", showIndex);
//router.get("/error", generateError);
router.get("/notebook/notes", server.loadNotes.bind(server));
router.get("/notebook/note/:_id/", server.loadNote.bind(server));
router.put("/notebook/note/:_id/", server.updateNote.bind(server));
router.post("/notebook/note", server.addNote.bind(server));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });

