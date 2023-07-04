import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { Photo } from './models/Photo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect DB
mongoose.connect('mongodb://127.0.0.1/pcat-test-db');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

const myLogger = (req, res, next) => {
    console.log('Middleware log 1');
    next();
};

const myLogger2 = (req, res, next) => {
    console.log('Middleware log 2');
    next();
};

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ROUTING
app.get('/', async (req, res) => {
    const photos = await Photo.find({})
    res.render('index', {
        photos
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/photos', async (req, res) => {
    await Photo.create(req.body);
    res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server ${port} was started.`);
});
