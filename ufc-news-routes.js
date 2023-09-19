import express from 'express';
import getMongoConnection from './utils/database.js';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db = getMongoConnection();

const apiRouter = express.Router();

const getUfcNews = async () => {

    const arrayNews = []

    try {
        const ufcNewsCollection = db.collection("ufcnews");
        return await ufcNewsCollection.find().toArray();

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }

    db.close();
}

apiRouter.route('/performmma/ufcnews').
    get(async (req, res) => {

        const tabUfcNews = await getUfcNews();
        res.json(tabUfcNews);
    });

export default { apiRouter };