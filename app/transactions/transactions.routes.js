const TransactionsController = require('./transactions.controller');

const getTransactions = async function(req, res, user) {
  return TransactionsController.getTransactions(req.query.address, user.wallets);
};

module.exports = { getTransactions };
