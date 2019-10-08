const UserModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const config = require('../config');

const addUser = data => {
  return new Promise((res, rej) => {
    if(!data)
      rej({
        status: 404,
        error: 'No data'
      })
    const user = new UserModel(data)
    user.save()
      .then(userData => {
        if(!userData || userData.length === 0){
          rej({
              status: 404,
              error: 'Users weren\'t found'
          })
        }
        res(userData)
      })
      .catch(err => {
        rej({
          status: 500,
          error: err
        })
      })
  })
}

const loginUser = (username, password) => {
  return new Promise((res, rej) => {
    UserModel.findOne({ username }, (err, user) => {
      if(err){
        rej({
          status: 500,
          error: err
        })
        return
      }
      if(!user) {
        rej({
          status: 404,
          error: 'User wasn\'t found'
        })
        return
      }
      user.comparePassword(password, (err, isMatch) => {
        if(err) {
          rej({
            status: 500,
            error: err
          })
          return
        }
        if(!isMatch){
          rej({
            status: 400,
            error: 'Wrong password'
          })
          return
        }
        if(isMatch){
          jwt.sign({ user }, config.secret, { expiresIn: '86400s' }, (err, token) => {
            if(err) {
              rej({
                status: 500,
                error: err
              })
              return
            }
            const { password, ...userData } = user.toObject();
            res({...userData, token});
          })
        }
      })
    })
  })
}



module.exports = {
  addUser,
  loginUser
};
