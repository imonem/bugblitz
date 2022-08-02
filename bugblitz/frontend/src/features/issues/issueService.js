import axios from 'axios';

const API_URL = '/api/issues/';

//Create issue
const createIssue = async (issueData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, issueData, config);

	return response.data;
};

const goalService = {
	createIssue,
};

export default goalService;
