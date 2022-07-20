const express = require('express');
const router = express.Router();
const {
	registerUser,
	userLogin,
	userData,
} = require('../controllers/userController');

router.post('/', registerUser);

router.post('/login', userLogin);

router.get('/me', userData);

module.exports = router;
