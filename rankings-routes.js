import express from 'express';
import { getRankingsNumberfights, getRankingsWins, getRankingsKoWins, getRankingsSubmissionWins } from './controllers/rankings-controller.js';


const apiRouter = express.Router();

apiRouter.route('/performmma/rankings/numberfights').
    get(async (req, res) => {

        const tabRankingsNumberFights = await getRankingsNumberfights();
        res.json(tabRankingsNumberFights);

    });

apiRouter.route('/performmma/rankings/wins').
    get(async (req, res) => {

        const tabRankings = await getRankingsWins();
        res.json(tabRankings);
    });


apiRouter.route('/performmma/rankings/kowins').
    get(async (req, res) => {

        const tabRankings = await getRankingsKoWins();
        res.json(tabRankings);
    });

apiRouter.route('/performmma/rankings/submissionwins').
    get(async (req, res) => {

        const tabRankings = await getRankingsSubmissionWins();
        res.json(tabRankings);
    });

apiRouter.route('/performmma/rankings/kodefeats').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });

apiRouter.route('/performmma/rankings/allcareerstrikes').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });


apiRouter.route('/performmma/rankings/submissiondefeats').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });


apiRouter.route('/performmma/rankings/fightstrikes').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });


apiRouter.route('/performmma/rankings/alltimeclinchs').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });


apiRouter.route('/performmma/rankings/alltimetakedowns').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });


apiRouter.route('/performmma/rankings/fighttakedowns').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });


apiRouter.route('/performmma/rankings/alltimetakedowndefends').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });

apiRouter.route('/performmma/rankings/fighttakedowndefends').
    get(async (req, res) => {

        // const tabRankingsVictories = await getRankingsVictories();
        // res.json(tabRankingsVictories);
    });

export default { apiRouter };