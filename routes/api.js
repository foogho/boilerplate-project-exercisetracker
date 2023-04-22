const router = require('express').Router();

const User = require('../models/user');

router.post('/users', async (req, res, next) => {
  try {
    const username = req.body.username;
    const user = new User({ username });
    await user.save();
    res.json({
      username: user.username,
      _id: user.id,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/users/:id/exercises', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const body = req.body;
    const user = await User.findById(userId);
    const { description, duration, date } = body;
    const exercise = user.log.create({ description, duration, date });
    user.log.push(exercise);
    await user.save();
    res.json({
      username: user.username,
      description,
      duration,
      date,
      _id: exercise.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
