const WalletsController = require('./wallets.controller');

const getWallets = async function (req, res, user) {
  return WalletsController.getWallets(user);
};

const createNewWallet = async function (req, res, user) {
  return WalletsController.createWallet(user);
};


module.exports = {
  getWallets,
  createNewWallet
};
