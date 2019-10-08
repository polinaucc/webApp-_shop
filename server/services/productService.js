const fs = require('fs')
const ProductModel = require("../models/product.model");


const getAllProductData = () => {
  return new Promise((res, rej) => {
    ProductModel.find({}, (err, data) => {
      if(err){
        rej({
          status: 500,
          error: err
        })
      }
      if(!data) {
        rej({
          status: 404,
          error: 'Products weren\'t found'
        })
      }
      res(data)
    })
  })
}

const getProductDataByCategory = category => {
  return new Promise((res, rej) => {
    ProductModel.find({ 'category': category }, (err, data) => {
      if(err){
        rej({
          status: 500,
          error: err
        })
      }
      if(!data) {
        rej({
          status: 404,
          error: `No products in category: ${category} were found`
        })
      }
      res(data)
    })
  })
}

const getProductById = id => {
  return new Promise((res, rej) => {
    ProductModel.findById( id , (err, data) => {
      if(err){
        rej({
          status: 500,
          error: err
        })
      }
      if(!data) {
        rej({
          status: 404,
          error: `No product with id: ${id} was found`
        })
      }
      res(data)
    })
  })
}


const addProductData = data => {
  return new Promise((res, rej) => {
    if(!data)
      rej({
        status: 404,
        error: 'No data'
      })
    const form = new ProductModel(data)
    form.save()
      .then(formData => {
        if(!formData || formData.length === 0){
          rej({
              status: 404,
              error: 'Products weren\'t found'
          })
        }
        res(formData)
      })
      .catch(err => {
        rej({
          status: 500,
          error: err
        })
      })
  })
}

const updateProductById = (id, update) => {
  return new Promise((res, rej) => {
    ProductModel.findByIdAndUpdate(id, update, (err, data) => {
      if(err){
        rej({
          status: 500,
          error: err
        })
      }
      if(!data) {
        rej({
          status: 404,
          error: `No product with id: ${id} was found`
        })
      }
      if(update.product_image){
        try{
          fs.unlinkSync(data.product_image, err => {
            if(err) console.log('file wasn\'t deleted')
          })
        } catch (e) {
          console.log('file wasn\'t found')
        }
      }
      res(data)
    })
  })
}

const deleteProductById = id => {
  return new Promise((res, rej) => {
    ProductModel.findByIdAndRemove(id, (err, data) => {
      if(err){
        rej({
          status: 500,
          error: err
        })
      }
      if(!data) {
        rej({
          status: 404,
          error: `No product with id: ${id} was found`
        })
      }
      try {
        fs.unlinkSync(data.product_image, err => {
          if(err) console.log('file wasn\'t deleted')
        })
      } catch (e) {
        console.log('file wasn\'t found')
      }
      res(data)
    })
  })
}

module.exports = {
  getAllProductData,
  addProductData,
  getProductDataByCategory,
  updateProductById,
  deleteProductById
};
