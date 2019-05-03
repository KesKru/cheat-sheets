[Back to Index](../README.md)

## Set-up Project

//in your project directory, be sure to first install your dependencies:

`$ npm install express cors knex body-parser pg morgan`

//pg is postgreSQL

//Then, in your app.js set up your const variables for these dependencies:

`const express = require('express');`

`const cors = require('cors');`

`const knex = require('knex');`

`const bodyParser = require('body-parser');`

`const morgan = require('morgan');`

`const app = express();`

//Also, set up your .use statements:

`app.use(cors());`

`app.use(bodyParser.json());`

//Also, get your server running (either locally or in development-mode (Heroku for us)):

```javascript
const port = process.env.PORT || 9000;

//The "pocess.env.PORT" part is for heroku port variable that they assign

app.listen(port, () => {
  console.log('I am listening on ${port}');
});

//single quotes above in console.log statement should actually be backticks in the code
```

## Database creation and set-up

1.  Create DB
    `$ createdb database-name`

        1a. Access a psql database
        `$ psql database_name`

2.  Use knex to connect to psql database(DB)
    `$ knex init`

    //This will create your ./knexfile.js. You need to set up the development and production environs:

    ```javascript
    module.exports = {
      development: {
        client: 'pg',
        connection: 'postgres://localhost/(db_name)'
      },

      production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
      }
    };
    ```

3.  Make a schema in knex
    `$ knex migrate:make (table_name)`

    -A migration file will be created within your file structure with a filename of something like: "20180904115015_author_book.js"

    -Pull up this file in your code editor and fill it in to set up your table columns (names and data types of the columns)

    The code will look something like:

    ```javascript
    exports.up = function(knex, Promise) {
      return knex.schema.createTable('books', (table) => {
        table.increments();
        table.string('book_title');
        table.string('book_genre');
        table.string('book_description', 1000);
        table.string('book_cover_url');
        table.integer('author_id_one');
        table.integer('author_id_two');
        table.integer('author_id_three');
      });
    };

    exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('books');
    };
    ```

4.  Use the schema to create a table in psql DB (the code sample above). Then run:
    `$ knex migrate:latest` This will populate your table with the above defined column names and specifications.

5.  Use knex to make dummy data
    `$ knex seed:make (00_table_name)`
    \*PRO-TIP: Make sure your object keys match EXACTLY to the schema (table column names) you defined earlier.

6.  Fill in psql DB with data via knex
    `$ knex seed:run`

7.  Check your work
    `$ psql (database_name)`
    `$ \dt`
    `$ select * from (table_name)`

## Queries

1. In your root project folder:
   `$ mkdir (db or whatever)`

2. `$ cd db` , then: `$ touch database-connection.js`
3. Then, in this file put in the following code:

```javascript
const knex = require('knex');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const database = knex(config[environment]);

module.exports = database;
```

(I believe that this code basically gets access to your database (whether it's served up locally (in development) or in production, like on Heroku or something.))

4. In your terminal, still within db directory:
   `$ touch queries.js`

5. Insert something like the following code for your CRUD queries:

```javascript
const database = require('./database-connection');

module.exports = {
  list() {
    return database('table_name');
  },
  read(id) {
    return database('table_name')
      .where('id', id)
      .returning('*')
      .then((record) => record[0]);
  },
  create(table_object) {
    return database('table_name')
      .insert(table_object)
      .returning('*')
      .then((record) => record[0]);
  },
  update(id, table_object) {
    return database('table_name')
      .update(table_object)
      .where('id', id)
      .returning('*');
    //.then(record => record[0])
    //Do I need the above when the same thing is basically in the router.put?
  },
  delete(id) {
    return database('table_name')
      .del()
      .where('id', id);
  }
};
```

## Routes

1. In your project root folder:
   `$ mkdir routes`

2. `$ cd routes`

3. For each table create a .js file (in this routes directory) for their respective routes:
   `$ touch table_name.js`

4. Then, within each of these files, insert something like the following code: (This code sets up your routes and then points to specific queries to use within your queries.js file.)

```javascript
const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

router.get('/', (req, res, next) => {
  queries.list('table_name').then((data_from_table) => {
    res.json({ data });
  });
});

router.get('/:id', function(request, response) {
  queries.read('table_name', request.params.id).then((table_object) => {
    table_object
      ? response.json({ table_object })
      : response.status(404).json({ message: 'Not found' });
  });
});

router.post('/', function(request, response, next) {
  queries.post('table_name', request.body).then((new_table_object) => {
    response.status(201).json({ new_table_object });
  });
});

router.put('/:id', function(request, response, next) {
  queries
    .update('table_name', request.params.id, request.body)
    .then((updated_table_object) => response.json(updated_table_object));
});

router.delete('/:id', function(request, response, next) {
  queries.deleteOne('table_name', request.params.id).then(() => {
    response.status(204).json();
  });
});

router.use(function(error, request, response, next) {
  console.error(error.stack);
  response.status(400).send('Error Something Went Wrong');
});

module.exports = router;
```

5.  Require these routes files in app.js:

```javascript
const table1Name = require('filepath/table1_file_name.js');
const table2Name = require('filepath/table2_file_name.js');
```
