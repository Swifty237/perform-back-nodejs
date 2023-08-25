import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { compareJsonNumberFights } from './utils/functions.js'

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

apiRouter.route('/perform-mma/rankings/number-fights').
    get(async (req, res) => {

        const fightersAndNumberFights = [];

        try {
            const fightersCollection = db.collection("fighters");
            const fighters = await fightersCollection.find().toArray();

            fighters.forEach(fighter => {

                const newJson = {
                    Name: fighter["Name"],
                    Division: fighter["Division Title"],
                    NumberFights: parseInt(fighter["Division Body"][0]["Wins"]) + parseInt(fighter["Division Body"][0]["Losses"]) + parseInt(fighter["Division Body"][0]["Draws"])
                }

                fightersAndNumberFights.push(newJson);
            })

            fightersAndNumberFights.sort(compareJsonNumberFights);

            console.log(fightersAndNumberFights);

            res.json({ message: "route classement nombre de combats" });

        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }


    });


apiRouter.route('/perform-mma/rankings/victories').
    get((req, res) => {

        res.json({ message: "route classement nombre de victoires" });

    });

export default { apiRouter };