[Back to Index](../README.md)

### Install

    $ npm install mongoose --save

### Connect

```js
    const mongoose = require('mongoose');

    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/test', function(err, res) {
      ...
    });
```

### Defining a schema

```js
const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0 },
  posts: [{ title: String, url: String, date: Date }],
  updated: { type: Date, default: Date.now }
});
```

#### SchemaTypes

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

Link to mongoose website: [SchemaTypes](http://mongoosejs.com/docs/schematypes.html)

Mixed types and dates that are modified using JavaScript Date methods are not hooked into mongoose change tracking logic. To save changes, let mongoose know about them using `markModified('path')` before calling `save`.

### Instantiating a model

A model is a constructor compiled from a schema. Model instances represent documents.

```js
const User = mongoose.model('User', userSchema);

var u = new User({
  name: {
    first: 'Tony',
    last: 'Pujals'
  },
  age: 99
});
```
