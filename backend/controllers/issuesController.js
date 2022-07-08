//Get tickets, route /api/issues, access Private
const getIssues = (req, res) => {
	res.status(200).json({ message: 'There are your tickets!!' });
};

//Get tickets, route /api/issues, access Private
const createIssues = (req, res) => {
	res.status(200).json({ message: 'Ticket created!!' });
};

//Get tickets, route /api/issues/:id, access Private
const updateIssue = (req, res) =>
	res.status(200).json({ message: `Ticket ${req.params.id} updated!!` });

//Get tickets, route /api/issues/:id, access Private
const deleteIssue = (req, res) =>
	res.status(200).json({ message: `Ticket ${req.params.id} deleted!!` });

module.exports = { getIssues, createIssues, updateIssue, deleteIssue };
