const express = require('express');
const cors = require('cors');
const userRoute = require('../routes/userRoute');
const registerRoute = require('../routes/registerRoute');
const adminManageRoute = require('../routes/adminManageRoute');
const productRoute = require('../routes/productRoute');
const saleRoute = require('../routes/saleRoute');
// const sellerOrdersRoute = require('../routes/sellerOrdersRoute');
// const customerOrdersRoute = require('../routes/customerOrdersRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/images', express.static('public'));
app.use('/login', userRoute);
app.use('/register', registerRoute);
app.use('/admin/manage', adminManageRoute);
app.use('/products', productRoute);
app.use('/sales', saleRoute);
// app.use('/customer/orders', customerOrdersRoute);
// app.use('/seller/orders', sellerOrdersRoute);

module.exports = app;
