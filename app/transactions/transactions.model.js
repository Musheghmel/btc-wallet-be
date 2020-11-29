const mongoose = require('../utils/mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TransactionsSchema = mongoose.Schema({
  direction: String,
  fromUserId: ObjectId,
  fromAddressId: ObjectId,
  fromAddress: String,
  toAddress: String,
  toAddressId: ObjectId,
  toUserId: ObjectId,
  amount: Number,
  fee: Number
});

TransactionsSchema.methods.format = function () {
  return {
    id: this._id,
    direction: this.direction,
    fromUserId: this.fromAddressUserId,
    fromAddressId: this.fromAddressId,
    fromAddress: this.fromAddress,
    toAddress: this.toAddress,
    toAddressId: this.toAddressId,
    toUserId: this.toAddressUserId,
    amount: this.amount,
    fee: this.fee,
    created: this.created
  };
};


TransactionsSchema.statics.getTransactions = async function (address, userId) {
  let data = {
    $or: [{ fromUserId: userId }, { toUserId: userId }]
  }

  if(address) {
    data.$or = [{ fromAddress: address }, { toAddress: address }]
  }

  return await this.find(data);
};


const Transactions = mongoose.model('Transaction', TransactionsSchema);
module.exports = Transactions;
