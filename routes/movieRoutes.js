'use strict';

const { Router } = require('express');
const repository = require('../repositories/repository');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { title, releaseYear, format, stars } = req.body;        
        const movie = await repository.createMovie(title, releaseYear, format, stars);
        res.json(movie);
    } catch (err) {
        res.json({ error: true, msg: err.message })
    }
});


router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const movie = await repository.getMovieById(id);
        res.json(movie);
    } catch (err) {
        res.json({ error: true, msg: err.message });
    }
});

// GET /api/movies/?title={title}&starName={starName}
router.get('/', async (req, res) => {
    try {
        const { title, starName } = req.query;
        const movies = await repository.getMovies(title, starName);
        res.json(movies);
    } catch (err) {
        res.json({ error: true, msg: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const movie = await repository.deleteMovie(id);
        res.json(movie);
    } catch (err) {
        res.json({ error: true, msg: err.message });
    }
});

module.exports = router;






