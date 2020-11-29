const appUtl = require('../utils/app-utl');
const Exception = require('../utils/exception');

const SessionManager = require("../auth/auth.manager");

const initialize = async function (app) {

  const authRoutes = require('../auth/auth.routes');
  const walletsRoutes = require('../wallets/wallets.routes');
  const transactionsRoutes = require('../transactions/transactions.routes');

  const addHandler = function (method, url, func, needAuth) {
    app[method](url, appUtl.endpoint(async (req, res) => {
      let session = null;
      try {
        session = needAuth ? await SessionManager.isAuth(req) : null;
      } catch (err) {}

      if (needAuth && session === null) {
        throw new Exception('Unauthorized', Exception.Type.ERROR_UNAUTHORIZED);
      }

      await _handleRequest(req, res, session, func);
    }));
  };

  const _handleRequest = async function (req, res, session, func) {
    const result = await func(req, res, session);
    appUtl.jsonOutHandler(null, result, res);
  };

  addHandler('post', '/api/auth', authRoutes.auth, false);
  addHandler('post', '/api/signup', authRoutes.signup, false);
  addHandler('get', '/api/wallets', walletsRoutes.getWallets, true);
  addHandler('post', '/api/wallets', walletsRoutes.createNewWallet, true);
  addHandler('get', '/api/transactions', transactionsRoutes.getTransactions, true);
};

module.exports = {
  initialize
};
