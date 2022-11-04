const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/loginRoute');
const registerRoute = require('../routes/registerRoute');
const adminManageRoute = require('../routes/adminManageRoute');
const productRoute = require('../routes/productRoute');
const saleRoute = require('../routes/saleRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/images', express.static('public'));
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/admin/manage', adminManageRoute);
app.use('/products', productRoute);
app.use('/sales', saleRoute);

module.exports = app;
