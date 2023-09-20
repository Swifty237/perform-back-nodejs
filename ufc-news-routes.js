import express from 'express';
import getMongoConnection from './utils/database.js';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db = getMongoConnection();

const apiRouter = express.Router();

const getUfcNews = async () => {

    try {
        const ufcNewsCollection = db.collection("ufcnews");
        const arrayNews = await ufcNewsCollection.find().toArray();
        return arrayNews;

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }

}

apiRouter.route('/performmma/ufcnews').
    get(async (req, res) => {

        const tabUfcNews = await getUfcNews();
        res.json(tabUfcNews);
    });

export default { apiRouter };