const Wallets = require('./wallets.model');
const appUtl = require('../utils/app-utl');
const TransactionsController = require('../transactions/transactions.controller');
let bitcoin = require('bitcoinjs-lib');
let bip32utils = require('bip32-utils');

class WalletsController {
  static async getWallets(user) {
    let wallets = await Wallets.getByWalletsId(user.wallets);
    if (wallets.length === 0) {
      await WalletsController.generateWallets(user.wallets);
      wallets = await Wallets.getByWalletsId(user.wallets);
      await TransactionsController.generateRandomTransactions(wallets);
    }

    return wallets.map(item => item.format());
  }

  static async createWallet(user) {
    let hdNode = bitcoin.HDNode.fromSeedHex(user.seed)
    let chain = new bip32utils.Chain(hdNode);

    for (let k = 0; k < user.wallets.length; ++k) {
      chain.next()
    }

    let address = chain.get();
    let wallet = await Wallets.maybeCreateWallet(address, appUtl.generateRandomBalance());
    return wallet.format();
  }

  static async generateWallets(wallets) {
    for (let wallet of wallets) {
      let newWallet = new Wallets({
        address: wallet,
        balance: appUtl.generateRandomBalance()
      });
      await newWallet.save();
    }
  }
}

module.exports = WalletsController;
