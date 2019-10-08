'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const verifyToken = require('./utils');
const config = require('../config')

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
const productService = require('../services/productService');

router.get('/product', (req, res) => {
  productService.getAllProductData()
    .then(form => res.status(200).json(form))
    .catch(result => res.status(result.status).json(result.error))
})

router.get('/product/:category', (req, res) => {
  productService.getProductDataByCategory(req.params.category)
    .then(form => res.status(200).json(form))
    .catch(result => res.status(result.status).json(result.error))
})

router.get('/product_id/:id', (req, res) => {
  productService.getProductDataByCategory(req.params.id)
    .then(form => res.status(200).json(form))
    .catch(result => res.status(result.status).json(result.error))
})

router.post('/product', verifyToken, upload.single('product_image'), (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if(err){
      res.status(401).json({
        message: 'Ошибка: пользователь не авторизирован'
      });
      return
    }
    const data = {...req.body, product_image: req.file.path};
    productService.addProductData(data)
      .then(form => res.status(200).json(form))
      .catch(result => res.status(result.status).json(result.error))
  })
  
})

router.put('/product/:id', verifyToken, upload.single('product_image'), (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if(err){
      res.status(401).json({
        message: 'Ошибка: пользователь не авторизирован'
      });
      return
    } 
    let img = req.file;
    let {product_image, ...data} = req.body
    console.log(img)
    if(img !== undefined){
      data.product_image = req.file.path
    }
    console.log(data)
    productService.updateProductById(req.params.id, data)
      .then(form => res.status(200).json(form))
      .catch(result => res.status(result.status).json(result.error))
  })

})

router.delete('/product/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if(err){
      res.status(401).json({
        message: 'Ошибка: пользователь не авторизирован'
      });
      return
    }
    productService.deleteProductById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(err.status).json(err.error))
  })
  
})

module.exports = router;