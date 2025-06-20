const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get all kudos cards for a board
router.get('/board/:boardId', async (req, res) => {
  try {
    const { boardId } = req.params;
    const kudosCards = await prisma.kudosCard.findMany({
      where: {
        boardId: parseInt(boardId),
      },
    });
    res.json(kudosCards);
  } catch (error) {
    console.error('Error fetching kudos cards:', error);
    res.status(500).json({ error: 'Failed to fetch kudos cards' });
  }
});

// Get a single kudos card
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const kudosCard = await prisma.kudosCard.findUnique({
      where: { id: parseInt(id) },
    });

    if (!kudosCard) {
      return res.status(404).json({ error: 'Kudos card not found' });
    }

    res.json(kudosCard);
  } catch (error) {
    console.error('Error fetching kudos card:', error);
    res.status(500).json({ error: 'Failed to fetch kudos card' });
  }
});

// Create a new kudos card
router.post('/', async (req, res) => {
  try {
    const { title, description, author, image, boardId } = req.body;
    const newKudosCard = await prisma.kudosCard.create({
      data: {
        title,
        description,
        author,
        image,
        upvotes: 0,
        boardId: parseInt(boardId),
      },
    });

    await prisma.board.update({
      where: { id: parseInt(boardId) },
      data: {
        kudosCount: {
          increment: 1,
        },
      },
    });

    res.status(201).json(newKudosCard);
  } catch (error) {
    console.error('Error creating kudos card:', error);
    res.status(500).json({ error: 'Failed to create kudos card' });
  }
});

// Update a kudos card
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const updatedKudosCard = await prisma.kudosCard.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        image,
      },
    });

    res.json(updatedKudosCard);
  } catch (error) {
    console.error('Error updating kudos card:', error);
    res.status(500).json({ error: 'Failed to update kudos card' });
  }
});

// Upvote a kudos card
router.post('/:id/upvote', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedKudosCard = await prisma.kudosCard.update({
      where: { id: parseInt(id) },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });
    res.json(updatedKudosCard);
  } catch (error) {
    console.error('Error upvoting kudos card:', error);
    res.status(500).json({ error: 'Failed to upvote kudos card' });
  }
});

// Toggle pin status of a kudos card
router.post('/:id/toggle-pin', async (req, res) => {
  try {
    const { id } = req.params;

    // First, get the current card to check its pin status
    const currentCard = await prisma.kudosCard.findUnique({
      where: { id: parseInt(id) }
    });

    if (!currentCard) {
      return res.status(404).json({ error: 'Kudos card not found' });
    }

    // Toggle the isPinned status and update pinnedAt
    const updatedKudosCard = await prisma.kudosCard.update({
      where: { id: parseInt(id) },
      data: {
        isPinned: !currentCard.isPinned,
        pinnedAt: !currentCard.isPinned ? new Date() : null
      }
    });

    res.json(updatedKudosCard);
  } catch (error) {
    console.error('Error toggling pin status:', error);
    res.status(500).json({ error: 'Failed to toggle pin status' });
  }
});

// Delete a kudos card
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cardId = parseInt(id);

    console.log(`Attempting to delete card with ID: ${cardId}`);

    const kudosCard = await prisma.kudosCard.findUnique({
      where: { id: cardId },
    });

    if (!kudosCard) {
      console.log(`Card with ID ${cardId} not found`);
      return res.status(404).json({ error: 'Kudos card not found' });
    }

    console.log(`Found card: ${JSON.stringify(kudosCard)}`);

    // Delete the kudos card
    await prisma.kudosCard.delete({
      where: { id: cardId },
    });

    await prisma.board.update({
      where: { id: kudosCard.boardId },
      data: {
        kudosCount: {
          decrement: 1,
        },
      },
    });

    console.log(`Successfully deleted card with ID: ${cardId}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting kudos card:', error);
    res.status(500).json({ error: 'Failed to delete kudos card' });
  }
});

module.exports = router;
