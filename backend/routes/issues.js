const express = require('express');
const router = express.Router();
const {
	getIssues,
	createIssues,
	updateIssue,
	deleteIssue,
} = require('../controllers/issuesController');

router.get('/', getIssues);

router.post('/', createIssues);

router.put('/:id', updateIssue);

router.delete('/:id', deleteIssue);

module.exports = router;
