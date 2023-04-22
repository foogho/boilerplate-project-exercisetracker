const router = require('express').Router();
const dayjs = require('dayjs');

const User = require('../models/user');

router.post('/users', async (req, res, next) => {
  try {
    const username = req.body.username;
    const user = new User({ username });
    await user.save();
    res.json({
      username: user.username,
      _id: user._id,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users', (req,res,next)=>{
  User.find({},{log : 0}).then((users)=>{
    res.json(users)
  }).catch(next)
})

router.post('/users/:id/exercises', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const body = req.body;
    const user = await User.findById(userId);
    const { description, duration, date : date = new Date() } = body;
    const exercise = user.log.create({description,duration,date});
    user.log.push(exercise);
    await user.save();
    res.json({
      ...exercise.toObject(),
      _id: user._id,
      username: user.username
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users/:id/logs', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { from, to, limit } = req.query;
    const user = await User.findById(userId, { 'log._id': 0 });
    let log = user.log;
    if (from) {
      log = log.filter((exercise) => {
        const exerciseDate = dayjs(exercise.date);
        return exerciseDate.isAfter(from) || exerciseDate.isSame(from, 'day');
      });
    }
    if (to) {
      log = log.filter((exercise) => {
        const exerciseDate = dayjs(exercise.date);
        return exerciseDate.isBefore(to) || exerciseDate.isSame(to, 'day');
      });
    }
    user.log = log.slice(0, limit);
    res.json(user.toObject({ virtuals: true }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
