//-----------------------Modules-----------------------//

//-----------------------Models-----------------------//
const User = require('../models/User');

//-----------------------Controlers-----------------------//

// GET | 'users/' | User rooot route
module.exports.getAllUsers = (req, res) => {
  // handle request
  res.send({ controller: 'getAllUsers' });
};

// POST | 'users/all' | Register new user
module.exports.registerNewUser = (req, res) => {
  const errors = {};

  // const newUser = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  // newUser.save((err, user) => {
  //   if (err) throw err;
  //   console.log(user);
  //   res.json({ newUser: user });
  // });

  User.findOne({ name: 'john6' }, function(err, user) {
    if (err) throw err;
    // test a matching password
    user.comparePassword('qweqwe', function(err, isMatch) {
      if (err) throw err;
      console.log('qweqwe:', isMatch); // -&gt; Password123: true
      res.json({ password: 'ok' });
    });
  });
};
