import express from 'express';
import {
    getRankingsNumberfights,
    getRankingsWins,
    getRankingsKoWins,
    getRankingsSubmissionWins,
    getRankingsStrikingAccuracy,
    getRankingsStrikingRatio,
    getRankingsTakedownAccuracy,
    getRankingsTakedownDefense,
    getRankingsTakedownsRatio,
    getRankingsIpsg
} from './controllers/rankings-controller.js';


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


apiRouter.route('/performmma/rankings/strikes').
    get(async (req, res) => {

        const tabRankings = await getRankingsStrikingAccuracy();
        res.json(tabRankings);
    });


apiRouter.route('/performmma/rankings/strikesratio').
    get(async (req, res) => {

        const tabRankings = await getRankingsStrikingRatio();
        res.json(tabRankings);
    });


apiRouter.route('/performmma/rankings/takedowns').
    get(async (req, res) => {

        const tabRankings = await getRankingsTakedownAccuracy();
        res.json(tabRankings);
    });


apiRouter.route('/performmma/rankings/takedowndefense').
    get(async (req, res) => {

        const tabRankings = await getRankingsTakedownDefense();
        res.json(tabRankings);
    });


apiRouter.route('/performmma/rankings/takedownsratio').
    get(async (req, res) => {

        const tabRankings = await getRankingsTakedownsRatio();
        res.json(tabRankings);
    });


apiRouter.route('/performmma/rankings/ipsg').
    get(async (req, res) => {

        const tabRankings = await getRankingsIpsg();
        res.json(tabRankings);
    });


export default { apiRouter };