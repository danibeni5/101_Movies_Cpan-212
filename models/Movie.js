const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Movie name is required. Please provided it'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required for the movie.'],
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Release year is required to upload the movie'],
        min: [1888, 'Year must be after 1888'],
        max: [new Date().getFullYear() + 5, 'Year cannot be in the far future']
    },
    genres: [{
        type: String,
        trim: true
    }],
    rating: {
        type: Number,
        min: [0, 'Rating cannot be less than 0'],
        max: [10, 'Rating cannot be more than 10'],
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);