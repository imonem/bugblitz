const asyncHandler = require('express-async-handler');
const { update } = require('../models/issueModel');

const Issue = require('../models/issueModel');

//Get tickets, route /api/issues, access Private
const getIssues = asyncHandler(async (req, res) => {
	const issues = await Issue.find();

	res.status(200).json(issues);
});

//Get tickets, route /api/issues, access Private
const createIssues = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	const issue = await Issue.create({
		text: req.body.text,
	});
	res.status(200).json(issue);
});

//Get tickets, route /api/issues/:id, access Private
const updateIssue = asyncHandler(async (req, res) => {
	const issue = await Issue.findById(req.params.id);

	if (!issue) {
		res.status(400);
		throw new Error('Issue not found');
	}

	const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedIssue);
});

//Get tickets, route /api/issues/:id, access Private
const deleteIssue = asyncHandler(async (req, res) => {
	const issue = await Issue.findById(req.params.id);

	if (!issue) {
		res.status(400);
		throw new Error('Issue not found');
	}

	await Issue.deleteOne();

	res.status(200).json({ id: req.params.id });
});
module.exports = { getIssues, createIssues, updateIssue, deleteIssue };
