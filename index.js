import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {NotebookRoutes} from "./routes/notebook_routes.js";
import {NotebookServer} from "./server/notebook-server.js";
import {NedbNotebookStore} from "./data/nedb-notebook-store.js";

class ServerBootstrapper {

    static notFoundMiddleware(req, res, next) {
        res.setHeader("Content-Type", 'text/html');
        res.status(404).send("Page not found. Try somewhere else.")
    }

    static errorHandlerMiddleware(err, req, res, next) {
        console.log(err);
        res.status(500).end(err.message);
    }

    static start() {
        const app = express();
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use("/notebook", NotebookRoutes.init(new NotebookServer(new NedbNotebookStore())));
        app.use(ServerBootstrapper.notFoundMiddleware);
        app.use(ServerBootstrapper.errorHandlerMiddleware);

        const hostname = '127.0.0.1';
        const port = 3001;
        app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
    }

}

ServerBootstrapper.start();


