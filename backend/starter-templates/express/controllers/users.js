//-----------------------Modules-----------------------//

//-----------------------Models-----------------------//

//-----------------------Controlers-----------------------//

// GET | 'users/' | User rooot route
module.exports.getAllUsers = (req, res) => {
  // handle request
  res.send({ controller: 'getAllUsers' });
};

// POST | 'users/all' | Register new user
module.exports.registerNewUser = (req, res) => {
  const errors = {};
  // handle request
  res.send({ controller: 'registerNewUser' });
};
