const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/expres-template-db', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB connected ');
  })
  .catch((err) => {
    console.log(err);
  });
