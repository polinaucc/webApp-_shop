const UserModel = require("../models/user.model");
const ProductModel = require('../models/product.model');
const mongoose = require('mongoose');

const getCartDataById = id => {
  return new Promise((res, rej) => {
    UserModel.findById(id, (err, data) => {
      if(err){
        rej({
          status: 500,
          error: err
        })
      }
      if(!data) {
        rej({
          status: 404,
          error: 'User wasn\'t found'
        })
      }
      
      const ids = data.cart.map(id => mongoose.Types.ObjectId(id));

      ProductModel.find({
        '_id' : { $in: ids }
      }, (err, docs) => {
        if(err) rej({
          status: 500,
          error: err
        })
        res(docs)
      })
      

      // data.cart.forEach(product => {
      //   ProductModel.findById(product, (err, productData) => {
      //     if(err){
      //       console.log(err)
      //     } if (!productData){
      //       console.log('Product not found')
      //     }
      //     console.log(productData)
      //     products.push(productData)
      //   })
      // })
      // console.log(products)
      // res(products)
    })
  })
}

const addToCart = (userId, productId) => {
  return new Promise((res, rej) => {
      UserModel.update({ _id: userId }, { $push: { cart: productId } }, (err, data) => {
        if(err){
          rej({
            status: 500,
            error: err
          })
        } if (data){
          res(data)
        }
      });
  })
}

const removeFromCart = (userId, productId) => {
  return new Promise((res, rej) => {
      UserModel.update({ _id: userId }, { $pull: { cart: productId } }, (err, data) => {
        if(err){
          rej({
            status: 500,
            error: err
          })
        } if (data){
          res(data)
        }
      });
  })
}

module.exports = {
  getCartDataById,
  addToCart,
  removeFromCart
};
