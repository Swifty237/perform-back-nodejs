import express from 'express';
import getMongooseConnection from './utils/database.js';
import UfcEventsDataSchema from './models/ufc-events-model.js';
import dotenv from 'dotenv';

dotenv.config();
const db = getMongooseConnection();

const apiRouter = express.Router();

const getUfcEvents = async () => {

    try {
        const arrayEvents = await UfcEventsDataSchema.find();
        return arrayEvents;

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

apiRouter.route('/performmma/ufcevents').
    get(async (req, res) => {

        const tabUfcEvents = await getUfcEvents();
        res.json(tabUfcEvents);
    });

export default { apiRouter };