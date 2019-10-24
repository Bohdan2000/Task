const express = require('express');

const tableController = require('./controller');

const router = express.Router();

router
    .get('/', tableController.getAllTables)

module.exports = router;