//-----------------------Modules-----------------------//

const express = require('express'); // include express module
const bodyParser = require('body-parser'); // parsing incoming express
const cors = require('cors');
const app = express(); // create an express instance

// Include routes
const usersRouter = require('./routes/users');

//-----------------------Config-----------------------//
//// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // parse form data
app.use(bodyParser.json()); // parse json data
app.use(cors());

//// Database
// Requiring file with no exports in it,- will run the whole file, like a big function.
require('./config/dbConfig'); // load and run db config

//-----------------------Routes-----------------------//

app.get('/', (req, res) => res.send('Hello World!'));

// Use routes
app.use('/users', usersRouter);

//-----------------------Start server-----------------------//

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
