const express = require('express');
const { PrismaClient } = require('../../generated/prisma');

const router = express.Router();
const prisma = new PrismaClient();

// Get all boards
router.get('/', async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        cards: true,
      },
    });
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// Get a single board by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const board = await prisma.board.findUnique({
      where: { id: parseInt(id) },
      include: {
        cards: true,
      },
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    res.json(board);
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
});

// Create a new board
router.post('/', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { title, description, category, author, image } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newBoard = await prisma.board.create({
      data: {
        title,
        description,
        category,
        author,
        image,
        kudosCount: 0,
      },
    });

    console.log('Created board:', newBoard);
    res.status(201).json(newBoard);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// Update a board
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, image } = req.body;

    const updatedBoard = await prisma.board.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        category,
        image,
      },
    });

    res.json(updatedBoard);
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ error: 'Failed to update board' });
  }
});

// Delete a board
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.board.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(500).json({ error: 'Failed to delete board' });
  }
});

module.exports = router;
