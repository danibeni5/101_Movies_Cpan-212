const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Cheks if user exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.render('auth/register', {
                title: 'Register',
                errors: [{ msg: 'Username or email already exists' }],
                username,
                email,
            });
        }

        //Hashes password 
        const salt = await bcrypt.genSalt(10);
        const passwordhash = await bcrypt.hash(password, salt);

        //Make new user
        const newUser = new User({
            username,
            email,
            passwordhash,
        });

        await newUser.save();

        //Direct to login/register when clicked.
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.render('auth/register', {
            title: 'Register',
            errors: [{ msg: 'Server error' }],
            username: req.body.username,
            email: req.body.email,
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        //Find users
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('auth/login', {
                title: 'Login',
                errors: [{ msg: 'Invalid username or password' }],
                username,
            });
        }

        //Check passwords 
        const isMatch = await bcrypt.compare(password, user.passwordhash);
        if (!isMatch) {
            return res.render('auth/login', {
                title: 'Login',
                errors: [{ msg: 'Invalid username or password' }],
                username,
            });
        }

        //Set ses
        req.session.userId = user._id;
        req.session.username = user.username;

        //Direct to home
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('auth/login', {
            title: 'Login',
            errors: [{ msg: 'Server error' }],
            username: req.body.username,
        });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
};

module.exports = {
    register,
    login,
    logout,
};
