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

const authService = {
	register,
};

export default authService;
