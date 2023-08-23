import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dataApiRoutes from './data-api-routes.js';
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

app.use(dataApiRoutes.apiRouter);

app.listen(process.env.PORT_HOST, () => {
    console.log("http://localhost:" + process.env.PORT_HOST);
});