const express = require('express');
const router = express.Router();

// Controlers
const usersControllers = require('../controllers/users');
// Input validation
const usersValidation = require('../validation/users');

// Route handlers
router.get('/', usersControllers.getAllUsers);

router.post(
  '/register',
  usersValidation.validateNewUser,
  usersControllers.registerNewUser
);

module.exports = router;
