const Exception = require('../utils/exception');
const User = require('../user/user.model');
const config = require('../../config');

class SessionManager {
  constructor() {
  }

  static async isAuth(req) {
    const token = await SessionManager.getAuthorizationToken(req);
    if(!token) {
      return null;
    }

    return await SessionManager.login(token);
  }

  static async login(login) {
    if(!login) {
      throw new Exception('Invalid login', Exception.Type.ERROR_VALIDATION);
    }

    let user = await User.findByLogin(login);
    if(!user) {
      throw new Exception('Invalid login', Exception.Type.ERROR_VALIDATION);
    }

    return user.format();
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
