const Transactions = require('./transactions.model');
const appUtl = require('./../utils/app-utl');
const Exception = require('../utils/exception');

class TransactionsController {
  static async getTransactions(address, wallets) {
    if (address) {
      if(!wallets.includes(address)) {
        throw new Exception('Permission denied', Exception.Type.ERROR_VALIDATION);
      }
    }

    let transactions = await Transactions.getTransactions(address, wallets);
    return transactions.map(item => item.format())
  }

  static async generateRandomTransactions(wallets) {
    for(let i = 0; i < 10; ++i ) {
      const shuffled = wallets.sort(() => 0.5 - Math.random());

      let wallet1 = shuffled[0];
      let wallet2 = shuffled[1];

      let balance = appUtl.generateRandomBalance();

      let transaction = new Transactions({
        direction: "out",
        fromAddress: wallet1.address,
        toAddress: wallet2.address,
        amount: -balance,
        fee: -(balance/100 * 2),
      });

      let transaction2 = new Transactions({
        direction: "in",
        fromAddress: wallet1.address,
        toAddress: wallet2.address,
        amount: balance,
        fee: 0,
      });

      await transaction.save();
      await transaction2.save();
    }
  }
}

module.exports = TransactionsController;
