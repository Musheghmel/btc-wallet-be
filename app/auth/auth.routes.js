const AuthManager = require('./auth.manager');

const auth = async function(req, res) {
  let login = req.body.login;
  return await AuthManager.login(login);
};

const signup = async function(req, res) {
  return await AuthManager.register();
}

module.exports = { signup, auth };
