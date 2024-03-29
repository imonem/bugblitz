const express = require('express');
const router = express.Router();
const {
	getIssues,
	createIssue,
	updateIssue,
	deleteIssue,
	getIssue,
} = require('../controllers/issuesController');
//protect routes middleware
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getIssues).post(protect, createIssue);

router
	.route('/:id')
	.get(protect, getIssue)
	.put(protect, updateIssue)
	.delete(protect, deleteIssue);

module.exports = router;
