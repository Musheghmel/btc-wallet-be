const mongoose = require('../utils/mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WalletsSchema = mongoose.Schema({
  address: String,
  balance: Number,
  userId: ObjectId
});

WalletsSchema.methods.format = function () {
  return {
    id: this._id,
    address: this.address,
    balance: this.balance,
    userId: this.userId,
    created: this.created,
    updated: this.updated
  };
};

WalletsSchema.statics.getByUserId = async function (userId) {
  return await this.find({ userId: userId });
};


const Wallets = mongoose.model('Wallet', WalletsSchema);
module.exports = Wallets;
