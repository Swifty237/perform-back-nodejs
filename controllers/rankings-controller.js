import {
    compareJsonNumberFights,
    compareJsonWins,
    compareJsonKoWins,
    compareJsonSubWins,
    compareJsonStriking,
    compareJsonStrikingRatio,
    compareJsonTakedown,
    compareJsonTakedownDefense,
    compareJsonTkdownsRatio
} from '../utils/functions.js';


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

    const tabJsonToReturn = [];

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

            tabJsonToReturn.push(newJson);
        })

        return tabJsonToReturn.sort(compareJsonNumberFights);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

export const getRankingsWins = async () => {

    const tabJsonToReturn = [];
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
                WinPercentage: ((parseInt(item["Wins"]) * 100) / parseInt(item["NumberFights"])).toFixed(2)
            }

            tabJsonToReturn.push(anotherJson);
        })

        return tabJsonToReturn.sort(compareJsonWins);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// percentage wins by KO
export const getRankingsKoWins = async () => {

    const tabJsonToReturn = [];
    const tabJson = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                Wins: parseInt(fighter["Division Body"][0]["Wins"]),
                KoTko: parseInt(fighter["Records"][0]["Wins by Knockout"])
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

            tabJsonToReturn.push(anotherJson);
        })

        return tabJsonToReturn.sort(compareJsonKoWins);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// percentage wins by submission
export const getRankingsSubmissionWins = async () => {

    const tabJsonToReturn = [];
    const tabJson = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                Wins: parseInt(fighter["Division Body"][0]["Wins"]),
                SubWins: parseInt(fighter["Records"][0]["Wins by Submission"])
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

            tabJsonToReturn.push(anotherJson);
        })

        return tabJsonToReturn.sort(compareJsonSubWins);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// Striking accuracy
export const getRankingsStrikingAccuracy = async () => {

    const tabJsonToReturn = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                StrikingAcc: fighter["Striking accuracy"]
            }

            tabJsonToReturn.push(newJson);
        })

        return tabJsonToReturn.sort(compareJsonStriking);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}


// Striking landed / Strinking attempted ratio
export const getRankingsStrikingRatio = async () => {

    const tabJsonToReturn = [];
    const tabJson = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                StrikesLanded: fighter["Sig"][" Strikes Landed"],
                StrikesAttempted: fighter["Sig"][" Strikes Attempted"]
            }

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {
            const anotherJson = {
                Name: item["Name"],
                Division: item["Division"],
                StrikingRatio: (parseInt(item["StrikesAttempted"]) / parseInt(item["StrikesLanded"])).toFixed(2)
            }

            tabJsonToReturn.push(anotherJson);
        })

        return tabJsonToReturn.sort(compareJsonStrikingRatio);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// Striking accuracy
export const getRankingsTakedownAccuracy = async () => {

    const tabJsonToReturn = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                TakedownAcc: fighter["Takedown Accuracy"]
            }

            tabJsonToReturn.push(newJson);
        })

        return tabJsonToReturn.sort(compareJsonTakedown);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// Takedown defenses
export const getRankingsTakedownDefense = async () => {
    const tabJsonToReturn = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                TakedownDef: fighter["Records"][0]["Takedown Defense"]
            }

            tabJsonToReturn.push(newJson);
        })

        return tabJsonToReturn.sort(compareJsonTakedownDefense);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}


// Takedowns landed / Takedowns attempted ratio
export const getRankingsTakedownsRatio = async () => {

    const tabJsonToReturn = [];
    const tabJson = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                TkdownsLanded: fighter["Takedowns Landed"],
                TkdownsAttempted: fighter["Takedowns Attempted"]
            }

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {
            const anotherJson = {
                Name: item["Name"],
                Division: item["Division"],
                TkdownsRatio: (parseInt(item["TkdownsAttempted"]) / parseInt(item["TkdownsLanded"])).toFixed(2)
            }

            tabJsonToReturn.push(anotherJson);
        })

        return tabJsonToReturn.sort(compareJsonTkdownsRatio);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
