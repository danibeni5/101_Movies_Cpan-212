const { body } = require('express-validator');

const validateRegister = [
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
        .trim()
        .escape(),
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validateLogin = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .trim()
        .escape(),
    body('password')
        .notEmpty().withMessage('Password is required'),
];

module.exports = {
    validateRegister,
    validateLogin,
};
