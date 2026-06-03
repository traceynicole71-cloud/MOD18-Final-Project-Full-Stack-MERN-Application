const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

//REST structure for account creation and entry access
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;