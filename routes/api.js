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

module.exports = router;
