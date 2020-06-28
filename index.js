import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {NotebookRoutes} from "./routes/notebook_routes.js";
import {NotebookController} from "./controller/notebook-controller.js";
import {NedbNotebookStore} from "./data/nedb-notebook-store.js";
import {Constants} from "./util/constants.js";

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
        app.use("/notebook", NotebookRoutes.init(new NotebookController(new NedbNotebookStore())));
        app.use(ServerBootstrapper.notFoundMiddleware);
        app.use(ServerBootstrapper.errorHandlerMiddleware);

        app.listen(Constants.PORT, Constants.HOST, () => {  console.log(`Server running at http://${Constants.HOST}:${Constants.PORT}/`); });
    }

}

ServerBootstrapper.start();


