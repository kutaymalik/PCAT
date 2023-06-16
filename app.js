import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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
app.use(myLogger);
app.use(myLogger2);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server ${port} was started.`);
});
