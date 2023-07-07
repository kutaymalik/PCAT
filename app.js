import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { Photo } from './models/Photo.js';
import fileUpload from 'express-fileupload';
import * as fs from 'fs';
import methodOverride from 'method-override';
import {
    createPhoto,
    deletePhoto,
    getAllPhotos,
    getPhoto,
    updatePhoto,
} from './controllers/photoController.js';
import {
    getAboutPage,
    getAddPage,
    getEditPage,
} from './controllers/pageController.js';

const app = express();

// Connect DB
mongoose.createConnection(
    'mongodb+srv://tatasmalik:3IN1qGANqeFZeRwR@cluster0.upnzern.mongodb.net/'
);


// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

// ROUTING
app.get('/', getAllPhotos);

app.get('/photos/:id', getPhoto);

app.put('/photos/:id', updatePhoto);

app.delete('/photos/:id', deletePhoto);

app.post('/photos', createPhoto);

app.get('/about', getAboutPage);

app.get('/add', getAddPage);

app.get('/photos/edit/:id', getEditPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server ${port} was started.`);
});
