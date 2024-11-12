const express = require('express');
const router = require('express').Router();

const newsController = require('../app/controllers/NewsController');

router.use('/:slug', newsController.detail);
router.use('/', newsController.index);

module.exports = router;