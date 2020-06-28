import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {NotebookRoutes} from "./routes/notebook_routes.js";
import {NotebookServer} from "./server/notebook-server.js";
import {NedbNotebookStore} from "./data/nedb-notebook-store.js";

class ServerBootstrapper {

    #app = express();

    notFoundMiddleware(req, res, next) {
        res.setHeader("Content-Type", 'text/html');
        res.status(404).send("Page not found. Try something else.")
    }

    errorHandlerMiddleware(err, req, res, next) {
        console.log(err);
        res.status(500).end(err.message);
    }

    start() {
        this.#app.use(cors());
        this.#app.use(bodyParser.urlencoded({ extended: false }));
        this.#app.use(bodyParser.json());
        this.#app.use("/notebook", NotebookRoutes.init(new NotebookServer(new NedbNotebookStore())));
        this.#app.use(this.notFoundMiddleware);
        this.#app.use(this.errorHandlerMiddleware);

        const hostname = '127.0.0.1';
        const port = 3001;
        this.#app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
    }

}

const bootstrapper = new ServerBootstrapper;
bootstrapper.start();


