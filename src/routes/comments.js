const express = require('express');
const { db } = require('../db');

const router = express.Router();

// GET /articles/:articleId/comments/:commentId - récupère un commentaire spécifique
router.get('/:commentId', (req, res) => {
  const comment = db.comments.find(c => c.id === req.params.commentId);
  
  if (!comment) {
    return res.status(404).json({ error: 'Commentaire non trouvé' });
  }

  res.json(comment);
});

module.exports = router;
