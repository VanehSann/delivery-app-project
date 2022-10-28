const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/loginRoute');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoute);

module.exports = app;
