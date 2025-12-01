const express = require('express');
const router = express.Router();
const movieHandler = require('../handlers/movieHandler');
const { requireAuth, requireOwner } = require('../middleware/auth');

// Display add movie form
router.get('/add', requireAuth, movieHandler.showAddForm);

// Handle movie creation
router.post('/add', requireAuth, movieHandler.addMovie);

// Display all movies
router.get('/', movieHandler.listMovies);

// Display single movie details
router.get('/:id', movieHandler.showMovieDetails);

// Display edit movie form
router.get('/edit/:id', movieHandler.showEditForm);

// Handle movie update
router.post('/edit/:id', movieHandler.updateMovie);

// Handle movie deletion
router.post('/delete/:id', movieHandler.deleteMovie);

module.exports = router;