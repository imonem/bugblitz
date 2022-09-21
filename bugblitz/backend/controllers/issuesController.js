const asyncHandler = require('express-async-handler');
const { update } = require('../models/issueModel');

const Issue = require('../models/issueModel');
const User = require('../models/userModel');

/**
 *@desc Get issues
 *@route GET /api/issues
 *@access Private
 */
const getIssues = asyncHandler(async (req, res) => {
	const issues = await Issue.find({ user: req.user.id });

	res.status(200).json(issues);
});

/**
 *@desc Get one issue
 *@route GET /api/issues
 *@access Private
 */
const getIssue = asyncHandler(async (req, res) => {
	const issue = await Issue.findById(req.params.id);
	if (!issue) {
		res.status(400);
		throw new Error('Issue not found');
	}

	// check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found.');
	}

	//User updates own tickets
	if (issue.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized.');
	}

	res.status(200).json(issue);
});

/**
 *@desc Create issues
 *@route POST /api/issues
 *@access Private
 */
const createIssue = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	const issue = await Issue.create({
		text: req.body.text,
		user: req.user.id,
		name: req.user.name,
		email: req.user.email,
	});
	res.status(200).json(issue);
});

/**
 *@desc Update issue
 *@route PUT /api/issues/:id
 *@access Private
 */
const updateIssue = asyncHandler(async (req, res) => {
	const issue = await Issue.findById(req.params.id);

	if (!issue) {
		res.status(400);
		throw new Error('Issue not found');
	}

	// check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found.');
	}

	//User updates own tickets
	if (issue.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized.');
	}

	const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedIssue);
});

/**
 *@desc Delete issue
 *@route DELETE /api/issues/:id
 *@access Private
 */
const deleteIssue = asyncHandler(async (req, res) => {
	const issue = await Issue.findById(req.params.id);

	if (!issue) {
		res.status(400);
		throw new Error('Issue not found');
	}

	// check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found.');
	}

	//User deletes own tickets
	if (issue.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized.');
	}

	await Issue.deleteOne(issue);

	res.status(200).json({ id: req.params.id });
});

module.exports = { getIssues, getIssue, createIssue, updateIssue, deleteIssue };
