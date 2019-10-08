'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const formRoute = require('./routes/form');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');

const app = express();

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

// const { server, database, username, pass} = config;

const server = config.server;
const database = config.database;
const username = config.username;
const pass = config.password;

mongoose.connect(`mongodb://${username}:${pass}@${server}/${database}`, mongoOptions);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use('/form_attachments', express.static('form_attachments'))
app.use('/product_attachments', express.static('product_attachments'))

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api', formRoute);
app.use('/api', productRoute);
app.use('/api', userRoute);
app.use('/api', cartRoute)

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(7777, console.log('Listening on port 7777...'));
