const express = require('express');
const { db, uuidv4 } = require('../db');

const router = express.Router();

// GET /articles - liste tous les articles
router.get('/', (req, res) => {
  res.json(db.articles);
});

// POST /articles - ajoute un nouvel article
router.post('/', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ 
      error: 'Title, content and author are required' 
    });
  }

  const newArticle = {
    id: uuidv4(),
    title,
    content,
    date: new Date().toLocaleDateString('en-GB'),
    author
  };

  db.articles.push(newArticle);
  res.status(201).json(newArticle);
});

// GET /articles/:articleId - récupère un article par ID
router.get('/:articleId', (req, res) => {
  const article = db.articles.find(a => a.id === req.params.articleId);
  if (!article) {
    return res.status(404).json({ error: 'Article non trouvé' });
  }
  res.json(article);
});

// GET /articles/:articleId/comments - récupère tous les commentaires d'un article
router.get('/:articleId/comments', (req, res) => {
  const comments = db.comments.filter(c => c.articleId === req.params.articleId);
  res.json(comments);
});

// POST /articles/:articleId/comments - ajoute un commentaire à un article
router.post('/:articleId/comments', (req, res) => {
  const article = db.articles.find(a => a.id === req.params.articleId);
  if (!article) {
    return res.status(404).json({ error: 'Article non trouvé' });
  }

  const { content, author } = req.body;
  
  if (!content || !author) {
    return res.status(400).json({ 
      error: 'Content and author are required' 
    });
  }

  const newComment = {
    id: uuidv4(),
    timestamp: Date.now(),
    content,
    articleId: req.params.articleId,
    author
  };

  db.comments.push(newComment);
  res.status(201).json(newComment);
});

module.exports = router;
