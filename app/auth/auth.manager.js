let bitcoin = require('bitcoinjs-lib')
let bip32utils = require('bip32-utils')
const bip39 = require('bip39');

const Exception = require('../utils/exception');
const config = require('../../config');

class SessionManager {
  constructor() {
  }

  static async isAuth(req) {
    const token = await SessionManager.getAuthorizationToken(req);
    if(!token) {
      return null;
    }

    let login = token.split(':')[0];
    let walletsCount = token.split(':')[1];

    if(!walletsCount) {
      throw new Exception('Invalid header data', Exception.Type.ERROR_VALIDATION);
    }

    return await SessionManager.login(login, walletsCount);
  }

  static async login(login, walletsCount) {
    if(!login) {
      throw new Exception('Invalid login', Exception.Type.ERROR_VALIDATION);
    }

    let seed = login;
    if(bip39.validateMnemonic(login)) {
      seed = bip39.mnemonicToSeedSync(login).toString('hex');
    }

    try {
      if(!walletsCount) {
        return { seed };
      } else {
        let wallets = [];
        let hdNode = bitcoin.HDNode.fromSeedHex(seed)
        let chain = new bip32utils.Chain(hdNode)

        for (let k = 0; k < walletsCount; ++k) {
          wallets.push(chain.get());
          chain.next()
        }

        return {
          seed,
          wallets
        };
      }
    } catch(err) {
      throw new Exception('Invalid login', Exception.Type.ERROR_VALIDATION);
    }

  }

  static async register() {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');

    return {
      mnemonic,
      seed
    }
  }

  static async getAuthorizationToken(req) {
    let authorizationData = null;
    const authHeader = config.auth.headerKey;

    if (req.headers.hasOwnProperty(authHeader)) {
      authorizationData = req.headers[authHeader].trim();

      if (authorizationData.length === 0) {
        return null;
      }
    } else if(req.headers.hasOwnProperty(authHeader.toLowerCase())) {
      authorizationData = req.headers[authHeader.toLowerCase()].trim();

      if (authorizationData.length === 0) {
        return null;
      }
    }

    return authorizationData;
  }
}

module.exports = SessionManager;
