'use strict';

const movieRoutes = require('./movieRoutes');

module.exports = app => {
  app.use('/api/movies', movieRoutes);
};
