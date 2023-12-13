const express = require('express');
const {
  loginUser,
  currentUser,
  registerUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/current', currentUser);

module.exports = router;
