const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

require('./config/logger');

// Connect To Database
mongoose.connect(config.database+config.args);

// On Connection
mongoose.connection.on('connected', () => {
  console.warn('Connecting to database ...');
})
.then(() => { // if all is ok we will be here
  console.warn('Authenticated to the database '+config.database);
})
.catch(err => { // we will not be here...
  console.error('MongoDb Connection Error', err);
});

const app = express();

const api = require('./routes/api');

// Port Number
const port = 4300;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/api', api);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
    console.warn('engine started on port ' + port);
});