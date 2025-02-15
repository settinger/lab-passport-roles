'use strict'

const bcrypt = require('bcryptjs');

const localSignin = function(username, password) {
  const Model = this;

  let auxiliaryUser;

  return Model.findOne({ username })
    .then(user => {
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      } else {
        auxiliaryUser = user;
        return bcrypt.compare(password, user.passwordHash);
      }
    })
    .then(matches => {
      if (!matches) {
        throw new Error('PASSWORD_DOES_NOT_MATCH');
      } else {
        return Promise.resolve(auxiliaryUser);
      }
    })
    .catch(error => {
      console.log(`Error signing in: ${error}`);
      return Promise.reject(error);
    });
};

module.exports = localSignin;