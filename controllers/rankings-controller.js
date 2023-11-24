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
    duplicateFilter
} from '../utils/functions.js';
import getMongooseConnection from '../utils/database.js';
import fighterSchema from '../models/fighter-model.js'
import dotenv from 'dotenv';

dotenv.config();
getMongooseConnection();
const fighters = await fighterSchema.find();

// Rankings by number fights
export const getRankingsNumberFights = async () => {

    const tabJsonToReturn = [];

    try {
        // const fightersCollection = db.collection("fighters");

        fighters.forEach(fighter => {

            const newJson = {
                Rank: 0,
                FighterId: fighter["FighterId"],
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00")
            }

            tabJsonToReturn.push(newJson);
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonNumberFights);


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

        fighters.forEach(fighter => {

            const newJson = {
                FighterId: fighter["FighterId"],
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                Wins: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00"),
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00")
            }

            tabJson.push(newJson);
        })

        tabJson.forEach(item => {

            const anotherJson = {
                Rank: 0,
                FighterId: item["FighterId"],
                Name: item["Name"],
                Division: item["Division"],
                NumberFights: item["NumberFights"],
                WinPercentage: item["Wins"] != 0 && item["NumberFights"] != 0 ? ((parseInt(item["Wins"]) * 100) / parseInt(item["NumberFights"])).toFixed(2) : "0.00"
            }

            tabJsonToReturn.push(anotherJson);
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonWins);


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

        fighters.forEach(fighter => {

            const newJson = {
                FighterId: fighter["FighterId"],
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

        })

        tabJson.forEach(item => {
            const anotherJson = {
                Rank: 0,
                FighterId: item["FighterId"],
                Name: item["Name"],
                Division: item["Division"],
                NumberFights: item["NumberFights"],
                WinsKoTko: item["KoTko"],
                KoTkoPercentage: item["Wins"] != 0 ? ((parseInt(item["KoTko"]) * 100) / parseInt(item["Wins"])).toFixed(2) : "0.00"
            }

            tabJsonToReturn.push(anotherJson);
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonKoWins);


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

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                FighterId: fighter["FighterId"],
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
                FighterId: item["FighterId"],
                Name: item["Name"],
                Division: item["Division"],
                NumberFights: item["NumberFights"],
                SubWins: item["SubWins"],
                SubWinsPercentage: item["Wins"] != 0 ? ((parseInt(item["SubWins"]) * 100) / item["Wins"]).toFixed(2) : "0.00"
            }

            tabJsonToReturn.push(anotherJson);
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonSubWins);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// Striking accuracy
export const getRankingsStrikingAccuracy = async () => {

    const tabJsonToReturn = [];

    try {

        fighters.forEach(fighter => {

            const newJson = {
                Rank: 0,
                FighterId: fighter["FighterId"],
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                StrikingAcc: fighter["Striking accuracy"]
            }

            tabJsonToReturn.push(newJson);
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonStriking);


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

        fighters.forEach(fighter => {

            const newJson = {
                Name: fighter["Name"],
                FighterId: fighter["FighterId"],
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
                    FighterId: item["FighterId"],
                    Name: item["Name"],
                    Division: item["Division"],
                    NumberFights: item["NumberFights"],
                    StrikingRatio: parseInt(item["StrikesLanded"]) != 0 ? (parseInt(item["StrikesAttempted"]) / parseInt(item["StrikesLanded"])).toFixed(2) : "0.00"
                }

                tabJsonToReturn.push(anotherJson);
            }
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonStrikingRatio);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// Striking accuracy
export const getRankingsTakedownAccuracy = async () => {

    const tabJsonToReturn = [];

    try {

        fighters.forEach(fighter => {

            const newJson = {
                Rank: 0,
                FighterId: fighter["FighterId"],
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

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonTakedown);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

// Takedown defenses
export const getRankingsTakedownDefense = async () => {
    const tabJsonToReturn = [];

    try {

        fighters.forEach(fighter => {

            const newJson = {
                Rank: 0,
                FighterId: fighter["FighterId"],
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                TakedownDef: fighter["Records"][0]["Takedown Defense"] && fighter["Records"][0]["Takedown Defense"] != "Null" ? fighter["Records"][0]["Takedown Defense"] : "0.00%"
            }

            tabJsonToReturn.push(newJson);
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonTakedownDefense);


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

        fighters.forEach(fighter => {

            const newJson = {
                FighterId: fighter["FighterId"],
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
                    FighterId: item["FighterId"],
                    Name: item["Name"],
                    Division: item["Division"],
                    NumberFights: item["NumberFights"],
                    TkdownsRatio: parseInt(item["TkdownsLanded"]) ? (parseInt(item["TkdownsAttempted"]) / parseInt(item["TkdownsLanded"])).toFixed(2) : "0.00"
                }

                tabJsonToReturn.push(anotherJson);
            }
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn.sort(compareJsonTkdownsRatio);


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

export const getRankingsLevel = async () => {
    const tabJsonToReturn = [];

    try {

        fighters.forEach(fighter => {

            const newJson = {
                Rank: 0,
                FighterId: fighter["FighterId"],
                Name: fighter["Name"],
                Division: fighter["Division Title"],
                NumberFights: parseInt(fighter["Division Body"][0]["Wins"] && fighter["Division Body"][0]["Wins"] != "Null" ? fighter["Division Body"][0]["Wins"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Losses"] && fighter["Division Body"][0]["Losses"] != "Null" ? fighter["Division Body"][0]["Losses"] : "0.00")
                    + parseInt(fighter["Division Body"][0]["Draws"] && fighter["Division Body"][0]["Draws"] != "Null" ? fighter["Division Body"][0]["Draws"] : "0.00"),
                Level: 0
            }

            tabJsonToReturn.push(newJson);
        })

        const filteredTabJsonToReturn = duplicateFilter(tabJsonToReturn, "FighterId");

        return filteredTabJsonToReturn;


    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
