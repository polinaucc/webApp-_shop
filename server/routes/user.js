'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const verifyToken = require('./utils');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './product_attachments');
  },
  filename: function(req, file, cb){
    let ext = file.originalname.split('.').pop();
    cb(null, crypto.randomBytes(10).toString('hex') + '.' + ext);
  }
})

const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });
// Services
const userService = require('../services/userService');

router.post('/login', upload.fields([]), (req, res) => {
  const { username, password } = req.body;
  userService.loginUser(username, password)
    .then(data => res.send(data))
    .catch(error => res.status(error.status).send(error.error))
})


router.post('/user', upload.fields([]), (req, res) => {
  console.log(req.body)
  userService.addUser(req.body)
    .then(form => res.status(200).json(form))
    .catch(result => res.status(result.status).json(result.error))
})

module.exports = router;