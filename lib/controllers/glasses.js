const { Router } = require('express');
const { Glass } = require('../models/Glass');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Glass.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
