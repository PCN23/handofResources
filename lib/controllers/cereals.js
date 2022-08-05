const { Router } = require('express');
const { Cereal } = require('../models/Cereal');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Cereal.getAll();
      console.log(data);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
