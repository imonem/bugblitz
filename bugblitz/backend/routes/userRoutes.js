const express = require('express');
const router = express.Router();
const {
	registerUser,
	userLogin,
	userData,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', userLogin);

router.get('/me', protect, userData);

module.exports = router;
