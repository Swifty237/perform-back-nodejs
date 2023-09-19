import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import rankingsRoutes from './rankings-routes.js';
import configsRoutes from './configurations-routes.js';
import pronosRoutes from './pronostics-routes.js';
import graphsRoutes from './graphs-routes.js';
import ufcNewsRoutes from './ufc-news-routes.js';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

//support parsing of JSON post data
const jsonParser = express.json({ extended: true });

app.use(jsonParser);

app.use(express.static(__dirname));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.LOCAL_FRONT_ACCESS_URI);
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        //to give access to all the methods provided
        return res.status(200).json({});
    }
    next();
});

app.get('/', (req, res) => {

    res.json({ "message": "hello world" })
});

app.use(
    rankingsRoutes.apiRouter,
    configsRoutes.apiRouter,
    pronosRoutes.apiRouter,
    graphsRoutes.apiRouter,
    ufcNewsRoutes.apiRouter
);

app.listen(process.env.LOCAL_BACK_NODE_ACCESS_PORT, () => {
    console.log(process.env.LOCAL_BACK_NODE_ACCESS_URI);
});