import axios from 'axios';

//make sure to add proxy value "http://localhost:5000" to fend package.json to construct the correct URL
const API_URL = '/api/users/';

//User registeration call

const register = async (userData) => {
	const response = await axios.post(API_URL, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}
	return response.data;
};

//Login

const login = async (userData) => {
	const response = await axios.post(API_URL + 'login', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}
	return response.data;
};

//Logout

const logout = () => {
	localStorage.removeItem('user');
};

/**
 * Add any function to the list of services provided by authService
 */
const authService = {
	register,
	login,
	logout,
};

export default authService;
