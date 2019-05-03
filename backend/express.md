[Back to Index](../README.md)

# Express.js 4 Cheatsheet

### Index:

- [Basic express server](#Basic-express-server)
- [Parsing requests](#Parsing-requests)
- [Static assets](#Static-assets)
- [View engines](#View-engines)
- [Database options](#Database-options)
- [Input validation](#Input-validation)
- [Logging](#Logging)
- [SASS compiling](#SASS-compiling)
- [HTTP Verbs and Routes](#HTTP-Verbs-and-Routes)
- [Request object](#Request-object)
- [Request Header Shortcuts](#Request-Header-Shortcuts)
- [Response](#Response)
- [Middleware](#Middleware)
- [Common Middleware](#Common-Middleware)
- [Other Popular Middleware](#Other-Popular-Middleware)

Express api reference - https://expressjs.com/en/4x/api.html

## Installation

`$ npm i express`

## Basic express server

```js
//-----------------------Modules-----------------------//

const express = require('express'); // include express module

// Extra modules goes here

const app = express(); // create an express instance

//-----------------------Config-----------------------//

// Configuration code goes here

//-----------------------Routes-----------------------//

app.get('/', (req, res) => res.send('Hello World!'));

//-----------------------Start server-----------------------//

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
```

```js
//-----------------------Dev dependencies-----------------------//

 // For automatic server releoding after save.

npm i nodemon

// to set up nodemon add this to package.json. Run it with npm start.

 "scripts": {
    "start": "nodemon app.js"
  }
```

## Parsing requests

```js
//body-parser module parses warious incoming request data formats to javascript formats.
//-----------------------Modules-----------------------//

const bodyParser = require('body-parser');

//-----------------------Config-----------------------//

// body-parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//*express@4.16.0 body-parser is included. to setup exchange word bodyParser with express.
```

## Static assets

```js
// Point to static assets folder

app.use(express.static(path.join(__dirname, 'public')));
```

## View engines

```js
// if yousing view engine specify it here.
//-----------------------Modules-----------------------//

const ejs = require('ejs');

//-----------------------Config-----------------------//

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

## Database options

### MongoDB

```js
// Database setup with mongoose for mongodb
//-----------------------Modules-----------------------//

const mongoose = require('mongoose'); // interactions with mongodb

//-----------------------Config-----------------------//

mongoose
  .connect('mongodb://localhost:27017/db-name-goes-here', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB connected ');
  })
  .catch((err) => {
    console.log(err);
  });
```

### PostgreSQL

```js
// Database setup with knex for postgreSQL
//-----------------------Modules-----------------------//

const cors = require('cors');
const knex = require('knex');

//-----------------------Config-----------------------//

app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'db-user-name-goes-here',
    password: 'user-password-goes-here',
    database: 'db-name-goes-here'
  }
});
```

## Input validation

```js
// Express-validator setup
//-----------------------Modules-----------------------//

// Creates a validation chain for one or more fields.
// They may be located in any of the following request objects(for more options):

body, cookies, headers, params, query

const { body } = require('express-validator/check')

//-----------------------Usage-----------------------//

// works as middlewere , usualy defined in coresponding controler file.
exports.validate = (method) => {
switch (method) {
    case 'createUser': {
     return [
        body('userName', 'userName doesn't exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('phone').optional().isInt(),
        body('status').optional().isIn(['enabled', 'disabled'])
       ]
    }
  }
}
```

```js
// Importing validation midlewere and aplying it to the rote

router.post(
  '/',
  userController.validate('createUser'),
  userController.createUser
);
```

For more options - https://express-validator.github.io/docs/

## Logging

```js
// Default express logger(debug) setup (console logging)
//-----------------------Modules-----------------------//

//-----------------------Config-----------------------//
```

```js
// Morgan logger setup (writing to file)
//-----------------------Modules-----------------------//

const fs = require('fs'); // node fs module for interacting with the file system.
const path = require('path'); // node module for working file and directory paths.
const morgan = require('morgan'); // logging middlewere.

//-----------------------Config-----------------------//

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a'
  }
);
// configure logger . Look fo available options at morgan github page.
app.use(
  morgan(
    ':method :url :status - :response-time ms :res[content-length]  [:date[clf]]',
    {
      stream: accessLogStream
    }
  )
);
```

https://github.com/expressjs/morgan

## SASS compiling

```js
npm i node-sass // Install npm sass

// Add script to package.json to live-watch sass files. start with `npm run scss`
"scripts": {
  "scss": "node-sass --watch scss-folder -o css-folder"
}

npm run scss // Start with live-watching scss fodler.
```

## HTTP Verbs and Routes

```js
 app.get(urlPattern, requestHandler[, requestHandler2, ...])
 app.post(urlPattern, requestHandler[, requestHandler2, ...])
 app.put(urlPattern, requestHandler[, requestHandler2, ...])
 app.delete(urlPattern, requestHandler[, requestHandler2, ...])
 app.all(urlPattern, requestHandler[, requestHandler2, ...])
 app.param([name,] callback)
 app.use([urlPattern,] requestHandler[, requestHandler2, ...])
```

## Request object

```js
request.params; // parameters middlware
request.param; // extract one parameter
request.query; // extract query string parameter
request.route; // return route string
request.cookies; // cookies, requires cookie-parser
request.signedCookies; // signed cookies, requires cookie-parser
request.body; // payload, requires body-parser
```

## Request Header Shortcuts

```js
request.get(headerKey); // value for the header key
request.accepts(type); // checks if the type is accepted
request.acceptsLanguage(language); // checks language
request.acceptsCharset(charset); // checks charset
request.is(type); // checks the type
request.ip; // IP address
request.ips; // IP addresses (with trust-proxy on)
request.path; // URL path
request.host; // host without port number
request.fresh; // checks freshness
request.stale; // checks staleness
request.xhr; // true for AJAX-y requests
request.protocol; // returns HTTP protocol
request.secure; // checks if protocol is https
request.subdomains; // array of subdomains
request.originalUrl; // original URL
```

## Response

```js
response.redirect(status, url); // redirect request
response.send(status, data); // send response
response.json(status, data); // send JSON and force proper headers
response.sendfile(path, options, callback); // send a file
response.render(templateName, locals, callback); // render a template
response.locals; // pass data to template
```

## Middleware

```js
// Middleware function structure

function(request, response, next) {}

// Middleware example

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

## Common folder structure

```js
root/
├── server.js     // Acts as the main file of the project where you initialize the app and other elements of the project.
├── package.json
├── controllers/
├── util/
├── middlewares/
├── models/
├── routes/
├── public/
├── views/
├── config/
└── tests/


// Sample project setup
project/
│ // Define your app route handlers and business logic
├─ controllers/
│   └─ users.js
│ // Writes utility/helper functions here which can be used in any other file.
├─ util/
│   └─ helper.js
│ // Middlewares to interpret all incoming requests before moving to the route handler.
├─ middlewares/
│   └─ auth.js
│ // serves as middleware between controller and the database. You define models a schemas here.
├─ models/
│   └─ user.js
│ // Define your app routes, with HTTP methods, imported midlewere and controllers.
├─ routes/
│   ├─ user.js
│   └─ router.js
│ // Store static images in/img, custom JavaScript files, and CSS /css
├─ public/
│   ├─ js/
│   ├─ css/
│   └─ img/
│ // Contains templates to be rendered by the server.
├─ views/
│   └─ users/
│       └─ index.ejs
│ // Here you can write all the unit tests or acceptance tests for the API server.
├─ tests/
│   └─ users/
│       ├─ create-user-test.js
│       ├─ update-user-test.js
│       └─ get-user-test.js
│ // Place for all configuration files, API keys etc.
├─ config/
│   └─ dbconfig.js
├─ .gitignore
│ // Main file of the project where you initialize the app and other elements of the project.
├─ app.js
│ // Takes care of the dependencies, npm scripts and the version of your project.
└─ package.json
```

## Common Middleware

`$ npm install <package_name>`

- [express-generator](https://github.com/expressjs/body-parser) - express template generator
- [body-parser](https://github.com/expressjs/body-parser) - request payload
- [cookie-parser](https://github.com/expressjs/cookie-parser) - parses cookies into other formats
- [express-validator](https://github.com/ctavan/express-validator): validation
- [cookie-session](https://github.com/expressjs/cookie-session) - session via cookies store
- [errorhandler](https://github.com/expressjs/errorhandler) - error handler
- [express-session](https://github.com/expressjs/session) - session via in-memory or other store
- [method-override](https://github.com/expressjs/method-override) - HTTP method override
- [morgan](https://github.com/expressjs/morgan) - server logs
- [serve-favicon](https://github.com/expressjs/serve-favicon) - favicons

## Other Popular Middleware

- [compression](https://github.com/expressjs/compression) - resopnse compression(gzip etc.)
- [passport](https://github.com/jaredhanson/passport): authentication library
- [helmet](https://github.com/evilpacket/helmet): security headers
- [cors](https://github.com/expressjs/cors): CORS
- [connect-timeout](https://github.com/expressjs/timeout) - times out a request
- [csurf](https://github.com/expressjs/csurf) - CSRF protection middleware
- [response-time](https://github.com/expressjs/response-time) - records the response time
- [serve-index](https://github.com/expressjs/serve-index) - Serves pages that contain directory listings
- [serve-static](https://github.com/expressjs/serve-static) static content
- [vhost](https://github.com/expressjs/vhost)
- [cookies](https://github.com/jed/cookies) and [keygrip](https://github.com/jed/keygrip): analogous to `cookie-parser`
- [raw-body](https://github.com/stream-utils/raw-body)
- [connect-multiparty](https://github.com/superjoe30/connect-multiparty), [connect-busboy](https://github.com/mscdex/connect-busboy)
- [qs](https://github.com/visionmedia/node-querystring): analogous to `query`
- [st](https://github.com/isaacs/st), [connect-static](https://github.com/andrewrk/connect-static) analogous to `staticCache`
- [less](https://github.com/emberfeather/less.js-middleware): LESS CSS
- [connect-redis](http://github.com/visionmedia/connect-redis)
