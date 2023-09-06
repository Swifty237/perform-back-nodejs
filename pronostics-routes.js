import express from 'express';

const apiRouter = express.Router();


apiRouter.route('/perform-mma/pronostics').
    get((req, res) => {

        res.json({ message: "route pronostics" });

    });

export default { apiRouter };