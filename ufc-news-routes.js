import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

const getUfcNews = async () => {

    const arrayNews = []

    try {
        const ufcNewsCollection = db.collection("ufcnews");
        return await ufcNewsCollection.find().toArray();

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

apiRouter.route('/perform-mma/ufcnews').
    get(async (req, res) => {

        const tabUfcNews = await getUfcNews();
        res.json(tabUfcNews);

    });

export default { apiRouter };