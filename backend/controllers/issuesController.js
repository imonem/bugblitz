//Get tickets, route /api/issues, access Private
const getIssues = (req, res) => {
	res.status(200).json({ message: 'There are your tickets!!' });
};

const createIssues = (req, res) => {
	res.status(200).json({ message: 'Ticket created!!' });
};

const updateIssue = (req, res) =>
	res.status(200).json({ message: `Ticket ${req.params.id} updated!!` });

const deleteIssue = (req, res) =>
	res.status(200).json({ message: `Ticket ${req.params.id} deleted!!` });

module.exports = { getIssues, createIssues, updateIssue, deleteIssue };
