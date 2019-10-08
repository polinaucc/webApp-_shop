'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const verifyToken = require('./utils');
const config = require('../config')

// Services
const cartService = require('../services/cartService');

router.get('/cart/:_id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if(err){
      res.status(401).json({
        message: 'Ошибка: пользователь не авторизирован'
      });
      return
    }
    cartService.getCartDataById(req.params._id)
    .then(form => res.status(200).json(form))
    .catch(result => res.status(result.status).json(result.error))
  })
})

router.post('/cart', verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if(err){
      res.status(401).json({
        message: 'Ошибка: пользователь не авторизирован'
      });
      return
    }
    const { userId, productId } = req.body;
    console.log(req.body)
    cartService.addToCart(userId, productId)
      .then(form => res.status(200).json(form))
      .catch(result => res.status(result.status).json(result.error))
  })
})

router.delete('/cart', verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if(err){
      res.status(401).json({
        message: 'Ошибка: пользователь не авторизирован'
      });
      return
    }
    const { userId, productId } = req.body;
    console.log(userId, productId)
    cartService.removeFromCart(userId, productId)
      .then(form => res.status(200).json(form))
      .catch(result => res.status(result.status).json(result.error))
  })
})

module.exports = router;