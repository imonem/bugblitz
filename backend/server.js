const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.port || 5000;

app.use('/api/issues', require('./routes/issues'));
app.listen(port, () => console.log(`Server running, listening on ${port}!`));
