const express = require('express');
const router = express.Router();
const term_controller = require('../controllers/term.controller');

router.get('/', term_controller.index);
router.get('/:id', term_controller.show);

module.exports = router;
