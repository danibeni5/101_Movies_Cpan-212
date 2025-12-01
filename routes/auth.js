const express = require('express');
const router = express.Router();
const authHandler = require('../handlers/authHandler');
const { body, validationResult } = require('express-validator');

// GET /auth/register
router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register' });
});

// POST /auth/register
router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/register', {
            title: 'Register',
            errors: errors.array(),
            username: req.body.username,
            email: req.body.email,
        });
    }
    authHandler.register(req, res);
});

// GET /auth/login
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login' });
});

// POST /auth/login
router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/login', {
            title: 'Login',
            errors: errors.array(),
            username: req.body.username,
        });
    }
    authHandler.login(req, res);
});

// POST /auth/logout
router.post('/logout', authHandler.logout);

module.exports = router;
