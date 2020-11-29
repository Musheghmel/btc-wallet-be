
# btc-wallet

Simple BTC wallet SPA be

## Requirements

- Node, MongoDB and npm

run node app.js after npm install.

App runs on 9025 port, you can change it in config.js


config.js

```js
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
```
