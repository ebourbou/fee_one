import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {notebookRoutes} from "./routes/notebook_routes.js";

const app = express();

// middlewares
function notFound(req,res, next) {
    res.setHeader("Content-Type", 'text/html');
    res.status(404).send("Confound it all!  We could not find ye's page! ")
}

function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).end(err.message);
}

//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/notebook", notebookRoutes);
app.use(notFound);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });

