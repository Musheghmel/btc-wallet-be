const UserController = require('./user.controller');

const signup = async function(req, res) {
  return UserController.generateUser();
};

module.exports = { signup };
