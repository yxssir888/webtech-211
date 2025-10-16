const express = require('express');
const articlesRouter = require('./articles');
const commentsRouter = require('./comments');

const router = express.Router();

// Routes principales
router.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur notre API' });
});

// Routes modulaires
router.use('/articles', articlesRouter);
router.use('/comments', commentsRouter);

module.exports = router;
