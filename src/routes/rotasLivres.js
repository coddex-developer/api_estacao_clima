import express from 'express';

const rotasLivres = express.Router();

rotasLivres.get('/', (req, res) => {
    res.send('Welcome to the public route!');
});

export default rotasLivres;
