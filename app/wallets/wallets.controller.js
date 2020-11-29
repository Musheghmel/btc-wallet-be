let bitcoin = require('bitcoinjs-lib')
let bip32utils = require('bip32-utils')
const Wallets = require('./wallets.model');
const appUtl = require('../utils/app-utl');
const TransactionsController = require('../transactions/transactions.controller');

class WalletsController {
  static async getWallets(user) {
    let wallets = await Wallets.getByUserId(user.id);
    if(wallets.length === 0) {
      await WalletsController.generateWallets(user.id, user.seed);
      wallets = await Wallets.getByUserId(user.id);
      await TransactionsController.generateRandomTransactions(wallets);
    }

    return wallets.map(item => item.format());
  }

  static async createWallet(user) {
    let wallets = await Wallets.getByUserId(user.id);
    let hdNode = bitcoin.HDNode.fromSeedHex(user.seed)
    let chain = new bip32utils.Chain(hdNode);

    for (let k = 0; k < wallets.length + 1; ++k)  {
      chain.next()
    }

    let address = chain.get();
    let wallet = new Wallets({
      address: address,
      balance: appUtl.generateRandomBalance(),
      userId: user.id
    });

    await wallet.save();

    return wallet.format();
  }

  static async generateWallets(userId, seedHex) {
    let hdNode = bitcoin.HDNode.fromSeedHex(seedHex)
    let chain = new bip32utils.Chain(hdNode)
    for (let k = 0; k < 10; ++k)  {
      let address = chain.get();

      let wallet = new Wallets({
        address: address,
        balance: appUtl.generateRandomBalance(),
        userId: userId
      });

      await wallet.save();
      chain.next()
    }
  }
}

module.exports = WalletsController;
