const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');

/**
 * @desc Register new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please fill all fields');
	}

	//Conditional check if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('Email already exists.');
	}

	//Hash password using bcryptjs
	const salt = await bcrypt.genSalt(10);
	const hashPass = await bcrypt.hash(password, salt);

	//Create the user
	const user = await User.create({
		name,
		email,
		password: hashPass,
	});

	/**Response on successful user creation
	 *All that is needed here is to return the token, which is stored at localstorage
	 *Remember when refactoring to remove the _id, name, and, email when returning response
	 */

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: genJWT(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data.');
	}
});

/**
 * @desc Authenticate user
 * @route POST /api/users/login
 * @access Public
 */
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	//Get user by email
	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: genJWT(user._id, user.name, user.email),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials.');
	}
});

/**
 * @desc Display user data
 * @route POST /api/users/me
 * @access Private
 */
const userData = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id);

	res.status(200).json({
		id: _id,
		name,
		email,
	});
});

//Generate JWT, remember that I can assign anything (here I assigned id) to the payload using .sign({id})
const genJWT = (id, name, email) => {
	return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	registerUser,
	userLogin,
	userData,
};
