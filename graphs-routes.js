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

apiRouter.route('/perform-mma/graphs').
    get((req, res) => {

        res.json({ message: "route graphe resultats" });

    });

export default { apiRouter };