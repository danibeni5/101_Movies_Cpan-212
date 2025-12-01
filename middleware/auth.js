const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }
    next();
};

const requireOwner = (req, res, next) => {

    const Movie = require('../models/Movie');
    Movie.findById(req.params.id, (err, movie) => {
        if (err || !movie) {
            return res.status(404).send('Movie not found');
        }
        if (movie.createdBy.toString() !== req.session.userId.toString()) {
            return res.status(403).send('Access denied');
        }
        next();
    });
};

module.exports = {
    requireAuth,
    requireOwner,
};
