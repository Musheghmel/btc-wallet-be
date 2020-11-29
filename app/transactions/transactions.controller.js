const Transactions = require('./transactions.model');
const appUtl = require('./../utils/app-utl');

class TransactionsController {
  static async getTransactions(address, userId) {
    let transactions = await Transactions.getTransactions(address, userId);

    return transactions.map(item => item.format())
  }

  static async generateRandomTransactions(wallets) {
    for(let i = 0; i <= 10; ++i ) {
      const shuffled = wallets.sort(() => 0.5 - Math.random());

      let wallet1 = shuffled[0];
      let wallet2 = shuffled[1];

      const dir = ["in", "out"];
      const randomDir = Math.floor(Math.random() * dir.length);

      let transaction = new Transactions({
        direction: dir[randomDir],
        fromUserId: wallet1.userId,
        fromAddressId: wallet1.id,
        fromAddress: wallet1.address,
        toAddress: wallet2.address,
        toAddressId: wallet2.id,
        toUserId: wallet2.userId,
        amount: appUtl.generateRandomBalance(),
        fee: (appUtl.generateRandomBalance()/100 * 2),
      });

      await transaction.save();
    }
  }
}

module.exports = TransactionsController;
