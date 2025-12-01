const Movie = require('../models/Movie');

// Display add movie form
exports.showAddForm = (req, res) => {
    res.render('movies/add', {
        title: 'Add New Movie',
        errors: null,
        formData: null
    });
};

// Handle movie creation
exports.addMovie = async (req, res) => {
    try {
        const { name, description, year, genres, rating } = req.body;






        // Validate required fields
        if (!name || !description || !year) {
            return res.render('movies/add', {
                title: 'Add New Movie',
                errors: [{ msg: 'Name, description, and year are required.' }],
                formData: req.body
            });
        }

        const genresArray = genres ? genres.split(',').map(g => g.trim()).filter(g => g) : [];

        // Create new movie
        const newMovie = new Movie({
            name,
            description,
            year: parseInt(year),
            genres: genresArray,
            rating: rating ? parseFloat(rating) : 0,
            createdBy: req.session.userId
        });

        await newMovie.save();

        // Redirect to movie list
        res.redirect('/movies');
    } catch (error) {
        console.error('Error adding movie:', error);
        res.render('movies/add', {
            title: 'Add New Movie',
            errors: [{ msg: 'Error saving movie. Please try again.' }],
            formData: req.body
        });
    }
};

// Display all movies
exports.listMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('createdBy', 'username').sort({ createdAt: -1 });
        res.render('movies/list', {
            title: 'All Movies',
            movies
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.render('movies/list', {
            title: 'All Movies',
            movies: []
        });
    }
};

// Display single movie details
exports.showMovieDetails = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('createdBy', 'username');
        if (!movie) {
            return res.status(404).render('error', { message: 'Movie not found' });
        }
        res.render('movies/detail', {
            title: movie.name,
            movie
        });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).render('error', { message: 'Server error' });
    }
};

// Display edit movie form
exports.showEditForm = async (req, res) => {
    res.render('movies/edit', {
        title: 'Edit Movie',
        movie: null,
        errors: null
    });
};

// Handle movie update
exports.updateMovie = async (req, res) => {
    res.redirect('/movies');
};

// Handle movie deletion
exports.deleteMovie = async (req, res) => {
    res.redirect('/movies');
};