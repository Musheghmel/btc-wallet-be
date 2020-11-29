const mongoose = require('../utils/mongoose');
const Schema = mongoose.Schema;

const WalletsSchema = mongoose.Schema({
  address: String,
  balance: Number
});

WalletsSchema.methods.format = function () {
  return {
    id: this._id,
    address: this.address,
    balance: this.balance,
    created: this.created,
    updated: this.updated
  };
};

WalletsSchema.statics.getByWalletsId = async function (wallets) {
  return await this.find({ address: {$in: wallets }}).sort({created: 1});
};

WalletsSchema.statics.maybeCreateWallet = async function (address, amount) {
  let ifExist = await this.findOne({address});
  if(ifExist) {
    return ifExist;
  } else {

    let wallet = new Wallets({
      address: address,
      balance: amount
    })

    await wallet.save();
    return wallet;
  }
};


const Wallets = mongoose.model('Wallet', WalletsSchema);
module.exports = Wallets;
