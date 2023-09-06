import express from 'express';

const apiRouter = express.Router();

apiRouter.route('/perform-mma/graphs').
    get((req, res) => {

        res.json({ message: "route graphe resultats" });

    });

export default { apiRouter };