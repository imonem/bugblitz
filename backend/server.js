const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.port || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/issues', require('./routes/issues'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running, listening on ${port}!`));
