const mongoose = require('mongoose');

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
