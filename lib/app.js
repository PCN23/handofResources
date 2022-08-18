const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/jerseys', require('./controllers/jerseys'));
app.use('/cereals', require('./controllers/cereals'));
app.use('/glasses', require('./controllers/glasses'));
app.use('/teams', require('./controllers/teams'));
app.use('/strains', require('./controllers/strains'));


// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
