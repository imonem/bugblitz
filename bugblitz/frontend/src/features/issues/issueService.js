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

//List issues
const listIssues = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL, config);

	return response.data;
};

const issueService = {
	createIssue,
	listIssues,
};

export default issueService;
