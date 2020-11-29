const bip39 = require('bip39');
const User = require('./user.model');

class UserController {
  static async generateUser() {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');

    let user = new User({
      mnemonic,
      seed
    });

    await user.save();

    return {
      mnemonic,
      seed
    }
  }

  static async getAddresses(user) {

  }

  static async getTransactions(walletAddress, user) {

  }
}

module.exports = UserController;
