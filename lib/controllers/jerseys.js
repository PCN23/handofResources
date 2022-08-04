const { Router } = require('express');
const { Jersey } = require('../models/Jersey');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Jersey.getAll();
    console.log(data);
    res.json(data);
  } catch (e) {
    next(e);
  }
});
