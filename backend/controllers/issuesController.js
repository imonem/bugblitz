const asyncHandler = require('express-async-handler');

//Get tickets, route /api/issues, access Private
const getIssues = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'There are your tickets!!' });
});

//Get tickets, route /api/issues, access Private
const createIssues = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	res.status(200).json({ message: 'Ticket created!!' });
});

//Get tickets, route /api/issues/:id, access Private
const updateIssue = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Ticket ${req.params.id} updated!!` });
});

//Get tickets, route /api/issues/:id, access Private
const deleteIssue = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Ticket ${req.params.id} deleted!!` });
});
module.exports = { getIssues, createIssues, updateIssue, deleteIssue };
