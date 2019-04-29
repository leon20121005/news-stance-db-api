const express = require('express');
const router = express.Router();
const news_controller = require('../controllers/news.controller');

router.get('/', news_controller.index);
router.get('/:id', news_controller.show);

module.exports = router;
