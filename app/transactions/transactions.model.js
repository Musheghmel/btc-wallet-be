const mongoose = require('../utils/mongoose');


const TransactionsSchema = mongoose.Schema({
  direction: String,
  fromAddress: String,
  toAddress: String,
  amount: Number,
  fee: Number
});

TransactionsSchema.methods.format = function () {
  return {
    id: this._id,
    direction: this.direction,
    fromAddress: this.fromAddress,
    toAddress: this.toAddress,
    amount: this.amount,
    fee: this.fee,
    created: this.created,
    updated: this.updated
  };
};


TransactionsSchema.statics.getTransactions = async function (address, wallets) {
  let data = {};

  if(address) {
    data.$or = [{ fromAddress: address, direction: 'out' }, { toAddress: address, direction: 'in'}]
  } else {
    data.$or = [{ fromAddress: wallets, direction: 'out' }, { toAddress: wallets, direction: 'in'}]
  }

  return await this.find(data);
};


const Transactions = mongoose.model('Transaction', TransactionsSchema);
module.exports = Transactions;
