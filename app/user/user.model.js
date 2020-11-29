const mongoose = require('../utils/mongoose');

const UserSchema = mongoose.Schema({
  seed: String,
  mnemonic: String
});

UserSchema.methods.format = function () {
  return {
    id: this._id,
    seed: this.seed,
    mnemonic: this.mnemonic
  };
};

UserSchema.statics.findByLogin = async function (login) {
  return await this.findOne({$or: [{seed: login}, {mnemonic: login}]});
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
