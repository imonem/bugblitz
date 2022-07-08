const express = require('express');
const router = express.Router();
const {
	getIssues,
	createIssues,
	updateIssue,
	deleteIssue,
} = require('../controllers/issuesController');

router.route('/').get(getIssues).post(createIssues);

router.route('/:id').put(updateIssue).delete(deleteIssue);

module.exports = router;
