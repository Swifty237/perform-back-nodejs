import { compareJsonNumberFights, compareJsonWins, getSeparateKoPercentage, compareJsonKoWins, compareJsonSubWins } from '../utils/functions.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

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

export const getRankingsNumberfights = async () => {

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

export const getRankingsWins = async () => {

    const fightersAndVictories = [];
    const tabJson = [];

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

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {

            const anotherJson = {
                Name: item["Name"],
                Division: item["Division"],
                NumberFights: item["NumberFights"],
                WinPercentage: ((parseInt(item["Wins"]) * 100) / parseInt(item["NumberFights"])).toFixed(2)
            }

            fightersAndVictories.push(anotherJson);
        })

        return fightersAndVictories.sort(compareJsonWins);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// percentage wins by KO
export const getRankingsKoWins = async () => {

    const fightersAndKoVictories = [];
    const tabJson = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                Wins: parseInt(fighter["Division Body"][0]["Wins"]),
                KoTko: parseInt(getSeparateKoPercentage(fighter["Stats"][0]["KOTKO"]))
            }

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {
            const anotherJson = {
                Name: item["Name"],
                Division: item["Division"],
                WinsKoTko: item["KoTko"],
                KoTkoPercentage: ((parseInt(item["KoTko"]) * 100) / item["Wins"]).toFixed(2)
            }

            fightersAndKoVictories.push(anotherJson);
        })

        return fightersAndKoVictories.sort(compareJsonKoWins);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// percentage wins by submission
export const getRankingsSubmissionWins = async () => {

    const fightersAndSubmissionsWins = [];
    const tabJson = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                Wins: parseInt(fighter["Division Body"][0]["Wins"]),
                SubWins: parseInt(getSeparateKoPercentage(fighter["Stats"][0]["SUB"]))
            }

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {
            const anotherJson = {
                Name: item["Name"],
                Division: item["Division"],
                SubWins: item["SubWins"],
                SubWinsPercentage: ((parseInt(item["SubWins"]) * 100) / item["Wins"]).toFixed(2)
            }

            fightersAndSubmissionsWins.push(anotherJson);
        })

        return fightersAndSubmissionsWins.sort(compareJsonSubWins);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}