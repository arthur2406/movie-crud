'use strict';

const app = require('./app');
require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000;

app.listen(port, () => {
  //console.log('Server is up on port ' + port);
});


