import express from 'express';
import getMongooseConnection from './utils/database.js';
import ufcNewsDataSchema from './models/ufc-news-model.js'
import dotenv from 'dotenv';

dotenv.config();
const db = getMongooseConnection();

const apiRouter = express.Router();

const getUfcNews = async () => {

    try {
        const arrayNews = await ufcNewsDataSchema.find();
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