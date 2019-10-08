const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');

const verifyToken = (req, res, next) => {
  const bearerHedaer = req.headers['authorization'];

  if(typeof bearerHedaer !== 'undefined'){
    const bearer = bearerHedaer.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401)
  }
}

module.exports = verifyToken
