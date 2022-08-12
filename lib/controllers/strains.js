const { Router } = require('express');
const { Strain } = require('../models/Strain');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Strain.getAll();
    res.json(data);
    console.log(data);
  } catch (e) {
    next(e);
  }
});
