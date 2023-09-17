import {
    compareJsonNumberFights,
    compareJsonWins,
    compareJsonKoWins,
    compareJsonSubWins,
    compareJsonStriking,
    compareJsonStrikingRatio,
    compareJsonTakedown,
    compareJsonTakedownDefense,
    compareJsonTkdownsRatio,
    getSeparatePercentage
} from '../utils/functions.js';


import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URI;

// mongoose.connect(mongoDbUrl);

// Connexion à la base de données MongoDB
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: process.env.MONGODB_AUTH_SOURCE ? process.env.MONGODB_AUTH_SOURCE : "",
    user: process.env.MONGODB_USER ? process.env.MONGODB_USER : "",
    pass: process.env.MONGODB_PASSWORD ? process.env.MONGODB_PASSWORD : "",
    dbName: process.env.MONGODB_DBNAME ? process.env.MONGODB_DBNAME : ""
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
    console.log('Connecté à MongoDB');
});


// Rankings by number fights
export const getRankingsNumberfights = async () => {

    const tabJsonToReturn = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Rank: 0,
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00")
            }

            tabJsonToReturn.push(newJson);
        })

        return tabJsonToReturn.sort(compareJsonNumberFights);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}


// Rankings by wins
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
                Rank: 0,
                Name: item["Name"],
                Division: item["Division"],
                NumberFights: item["NumberFights"],
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
                NumberFights:
                    parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                Wins: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00"),
                KoTko: parseInt(fighter["Records"][0]["Wins by Knockout"] ? fighter["Records"][0]["Wins by Knockout"] : "0.00")
            }

            tabJson.push(newJson);
            // console.log("newJson ============================================================================================")
            // console.log("Name : " + newJson.Name)
            // console.log("NumberFights : " + newJson.NumberFights)
            // console.log("Kotko : " + newJson.KoTko)
            // console.log("")

        })

        tabJson.forEach(item => {
            const anotherJson = {
                Rank: 0,
                Name: item["Name"],
                Division: item["Division"],
                NumberFights: item["NumberFights"],
                WinsKoTko: item["KoTko"],
                KoTkoPercentage: item["Wins"] != 0 ? ((parseInt(item["KoTko"]) * 100) / parseInt(item["Wins"])).toFixed(2) : "0.00"
            }

            tabJsonToReturn.push(anotherJson);
            // console.log("anotherJson ============================================================================================")
            // console.log("Name : " + anotherJson.Name)
            // console.log("NumberFights : " + anotherJson.NumberFights)
            // console.log("WinsKotko : " + anotherJson.WinsKoTko)
            // console.log("KotkoPercentage : " + anotherJson.KoTkoPercentage)
            // console.log("")
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
                NumberFights:
                    parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                Wins: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00"),
                SubWins: parseInt(fighter["Records"][0]["Wins by Submission"] ? fighter["Records"][0]["Wins by Submission"] : "0.00")
            }

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {
            const anotherJson = {
                Rank: 0,
                Name: item["Name"],
                Division: item["Division"],
                NumberFights: item["NumberFights"],
                SubWins: item["SubWins"],
                SubWinsPercentage: item["Wins"] != 0 ? ((parseInt(item["SubWins"]) * 100) / item["Wins"]).toFixed(2) : "0.00"
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
                Rank: 0,
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                StrikingAcc: fighter["Striking accuracy"]
            }

            tabJsonToReturn.push(newJson);
            // console.log("newJson ============================================================================================")
            // console.log("Name : " + newJson.Name)
            // console.log("NumberFights : " + newJson.NumberFights)
            // console.log("StrikingAcc : " + newJson.StrikingAcc)
            // console.log("")
        })

        // console.log((tabJsonToReturn).sort(compareJsonStriking));

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
                NumberFights:
                    parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                StrikesLanded: fighter["Sig"][" Strikes Landed"] ? parseInt(fighter["Sig"][" Strikes Landed"]) : 0,
                StrikesAttempted: fighter["Sig"][" Strikes Attempted"] ? parseInt(fighter["Sig"][" Strikes Attempted"]) : 0
            }

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {

            if (item["StrikesAttempted"] && item["StrikesLanded"]) {
                const anotherJson = {
                    Rank: 0,
                    Name: item["Name"],
                    Division: item["Division"],
                    NumberFights: item["NumberFights"],
                    StrikingRatio: parseInt(item["StrikesLanded"]) != 0 ? (parseInt(item["StrikesAttempted"]) / parseInt(item["StrikesLanded"])).toFixed(2) : "0.00"
                }

                tabJsonToReturn.push(anotherJson);
            }
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
                Rank: 0,
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights:
                    parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                TakedownAcc: fighter["Takedown Accuracy"] && fighter["Takedown Accuracy"] != "Null" ? fighter["Takedown Accuracy"] : "0%"
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
                Rank: 0,
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                TakedownDef: fighter["Records"][0]["Takedown Defense"] && fighter["Records"][0]["Takedown Defense"] != "Null" ? fighter["Records"][0]["Takedown Defense"] : "0.00%"
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
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                TkdownsLanded: fighter["Takedowns Landed"] && fighter["Takedowns Landed"] != "Null" ? fighter["Takedowns Landed"] : "O.OO",
                TkdownsAttempted: fighter["Takedowns Attempted"] && fighter["Takedowns Attempted"] != "Null" ? fighter["Takedowns Attempted"] : "0.00"
            }

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {

            if (item["TkdownsAttempted"] && item["TkdownsLanded"]) {
                const anotherJson = {
                    Rank: 0,
                    Name: item["Name"],
                    Division: item["Division"],
                    NumberFights: item["NumberFights"],
                    TkdownsRatio: parseInt(item["TkdownsLanded"]) ? (parseInt(item["TkdownsAttempted"]) / parseInt(item["TkdownsLanded"])).toFixed(2) : "0.00"
                }

                tabJsonToReturn.push(anotherJson);
            }
        })

        return tabJsonToReturn.sort(compareJsonTkdownsRatio);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

export const getRankingsIpsg = async () => {
    const tabJsonToReturn = [];

    try {
        const fightersCollection = db.collection("fighters");
        const fighters = await fightersCollection.find().toArray();

        fighters.forEach(fighter => {

            const newJson = {
                Rank: 0,
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                Ipsg: 0
            }

            tabJsonToReturn.push(newJson);
        })

        return tabJsonToReturn;


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
