const AuthManager = require('./auth.manager');

const auth = async function(req, res) {
  let login = req.body.login;
  return await AuthManager.login(login);
};

module.exports = { auth };
