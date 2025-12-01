const express = require('express');
const router = express.Router();
const mainHandler = require('../handlers/mainHandler');

// Homepage
router.get('/', mainHandler.getHomepage);

module.exports = router;