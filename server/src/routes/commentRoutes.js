const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/card/:cardId', async (req, res) => {
  try {
    const { cardId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { cardId: parseInt(cardId) },
      orderBy: { createdAt: 'desc' }
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { message, author, cardId } = req.body;

    if (!message || !cardId) {
      return res.status(400).json({ error: 'Message and cardId are required' });
    }

    const comment = await prisma.comment.create({
      data: {
        message,
        author,
        cardId: parseInt(cardId)
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { message, author } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const comment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { message, author }
    });

    res.json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;
