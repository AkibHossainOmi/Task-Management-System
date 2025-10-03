const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user.id,
    });
    await task.save();
    res.json(task);
  } catch (err) { res.status(500).send('Server error'); }
});

router.get('/', auth, async (req, res) => {
  try {
    const { status, search, dueDate } = req.query;
    const q = {};
    if (status) q.status = status;
    if (search) q.title = { $regex: search, $options: 'i' };
    if (dueDate) q.dueDate = { $lte: new Date(dueDate) };
    const tasks = await Task.find(q).populate('assignedUser', 'name email').sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { res.status(500).send('Server error'); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { res.status(500).send('Server error'); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { res.status(500).send('Server error'); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;