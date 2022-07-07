const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.port || 5000;

app.get('/api/issues', (req, res) =>
	res.status(200).json({ message: 'There are your tickets!!' }),
);
app.listen(port, () => console.log(`Server running, listening on ${port}!`));
