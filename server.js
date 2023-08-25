import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import rankingsRoutes from './rankings-routes.js';
import configsRoutes from './configurations-routes.js';
import pronosRoutes from './pronostics-routes.js';
import graphsRoutes from './graphs-routes.js';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

//support parsing of JSON post data
const jsonParser = express.json({ extended: true });
app.use(jsonParser);

app.use(express.static(__dirname));

app.get('/', (req, res) => {

    res.json({ "message": "hello world" })
});

app.use(
    rankingsRoutes.apiRouter,
    configsRoutes.apiRouter,
    pronosRoutes.apiRouter,
    graphsRoutes.apiRouter
);

app.listen(process.env.PORT_HOST, () => {
    console.log("http://localhost:" + process.env.PORT_HOST);
});