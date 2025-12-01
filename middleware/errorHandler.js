

const mongoose = require('mongoose');

exports.handleErrors = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    //log errors
    console.error('Error:', err);

    //mongoose bad id
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = createError(message, 404);
    }

    //mon duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = createError(message, 400);
    }

    //mon validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = createError(message, 400);
    }

    //jsonwtoken error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = createError(message, 401);
    }

    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = createError(message, 401);
    }

    res.status(error.statusCode || 500).render('error', {
        title: error.statusCode === 404 ? 'Not Found' : 'Server Error',
        message: error.message || 'Something went wrong!',
        statusCode: error.statusCode || 500
    });
};

//404 errors
exports.handle404 = (req, res) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist.',
        statusCode: 404
    });
};

//makes an error object
const createError = (message, statusCode) => {
    return {
        message,
        statusCode
    };
};

//Async error hand
exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

//Database error
exports.handleDatabaseError = (err) => {
    console.error('Database Error:', err);

    process.exit(1);
};
