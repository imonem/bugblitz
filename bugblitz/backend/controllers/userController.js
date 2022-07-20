/**
 * @desc Register new user
 * @route POST /api/users
 * @access Public
 */

const registerUser = (req, res) => {
	res.json({ message: 'Hamada@@' });
};
/**
 * @desc Authenticate user
 * @route POST /api/users/login
 * @access Public
 */

const userLogin = (req, res) => {
	res.json({ message: 'Hamada@@ is enter' });
};
/**
 * @desc Display user data
 * @route POST /api/users/me
 * @access Public
 */

const userData = (req, res) => {
	res.json({ message: 'Hamada@@s data displayed' });
};

module.exports = {
	registerUser,
	userLogin,
	userData,
};
