const FormModel = require("../models/form.model");

const getAllFormData = () => {
  return new Promise((res, rej) => {
    FormModel.find({}, (err, data) => {
      if(err){
        rej({
          status: 500,
          error: err
        })
      }
      if(!data) {
        rej({
          status: 404,
          error: 'Forms weren\'t found'
        })
      }
      res(data)
    })
  })
}

const addFormData = data => {
  return new Promise((res, rej) => {
    if(!data)
      rej({
        status: 404,
        error: 'No data'
      })
    const form = new FormModel(data)
    form.save()
      .then(formData => {
        if(!formData || formData.length === 0){
          rej({
              status: 404,
              error: 'Forms weren\'t found'
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

module.exports = {
  getAllFormData,
  addFormData
};
