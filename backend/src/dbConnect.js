const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections

mongoose.connect(process.env.DATABASE,  { useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`Could not connect to MongoDB : ${err.message}`);
});

require('./models/Customer');
require('./models/User');

