'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './form_attachments');
  },
  filename: function(req, file, cb){
    let ext = file.originalname.split('.').pop();
    cb(null, crypto.randomBytes(10).toString('hex') + '.' + ext);
  }
})

const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });


// Services
const formService = require('../services/formService');

router.get('/form', (req, res) => {
  formService.getAllFormData()
    .then(form => res.status(200).json(form))
    .catch(result => res.status(result.status).json(result.error))
})

router.post('/form', upload.single('attachment'), (req, res) => {
  const data = {...req.body, attachment: req.file.path};
  formService.addFormData(data)
    .then(form => res.status(200).json(form))
    .catch(result => res.status(result.status).json(result.error))
})

module.exports = router;