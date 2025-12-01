const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
//Opens on port 3000
const PORT = process.env.PORT || 3000;


//


// Connect to database
connectDB();

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));


//



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// View engine setup
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/index'));



app.use('/auth', require('./routes/auth'));
app.use('/movies', require('./routes/movies'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});






// Error handling middleware
const { handle404, handleErrors } = require('./middleware/errorHandler');

// 404 handler
app.use(handle404);

// Error handler
app.use(handleErrors);

module.exports = app;