import express from 'express';

const apiRouter = express.Router();


apiRouter.route('/perform-mma/configurations').
    get(async (req, res) => {

        res.json({ message: "route configurations" });

    });

export default { apiRouter };