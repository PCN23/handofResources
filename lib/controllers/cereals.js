const { Router } = require('express');
const { Cereal } = require('../models/Cereal');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Cereal.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Cereal.getAll();
      console.log(data);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
