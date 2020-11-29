const Config = {
  version: "0.0.1",
  apiVersion: "1.0",
  listeningPort: 9025
};

Config.mongoDB = {
  "host": "mongodb://localhost:27017",
  "database": "btc-wallet",
  "configs": "connectTimeoutMS=300000",
  "isDebug": true
};

Config.auth = {
  "headerKey": "Authorization"
};

module.exports = Config;
