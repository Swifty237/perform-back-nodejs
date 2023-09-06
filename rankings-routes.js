import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { compareJsonNumberFights, compareJsonVictories } from './utils/functions.js'

dotenv.config();

const apiRouter = express.Router();
const mongoDbUrl = process.env.MONGODB_URI;

// Connexion à la base de données MongoDB
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: process.env.AUTH_SOURCE,
    user: process.env.DB_USER,
    pass: process.env.PASS,
    dbName: process.env.DBNAME
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
    console.log('Connecté à MongoDB');
});

const getRankingsNumberfights = async () => {

    const fightersAndNumberFights = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"])
                    + parseInt(fighter["Division Body"][0]["Losses"])
                    + parseInt(fighter["Division Body"][0]["Draws"])
            }

            fightersAndNumberFights.push(newJson);
        })

        return fightersAndNumberFights.sort(compareJsonNumberFights);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

const getRankingsVictories = async () => {

    const fightersAndVictories = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                Wins: parseInt(fighter["Division Body"][0]["Wins"]),
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"])
                    + parseInt(fighter["Division Body"][0]["Losses"])
                    + parseInt(fighter["Division Body"][0]["Draws"])
            }

            fightersAndVictories.push(newJson);
        })

        return fightersAndVictories.sort(compareJsonVictories);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

apiRouter.route('/perform-mma/rankings/numberfights').
    get(async (req, res) => {

        const tabRankingsNumberFights = await getRankingsNumberfights();
        res.json(tabRankingsNumberFights);

    });

apiRouter.route('/perform-mma/rankings/victories').
    get(async (req, res) => {

        const tabRankingsVictories = await getRankingsVictories();
        res.json(tabRankingsVictories);
    });

export default { apiRouter };