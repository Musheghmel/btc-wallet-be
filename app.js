const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const appUtl = require('./app/utils/app-utl');
const config = require('./config');
const Exception = require('./app/utils/exception');

let app = null;
let server = null;

function initExpress() {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(new Exception(`Not found: ${req.originalUrl}`, Exception.Type.ERROR_API_NOT_FOUND));
  });

  // error handler
  app.use(function(err, req, res, next) {
    appUtl.log.error('GLOBAL ERROR HANDLER: ' + JSON.stringify(err));
    appUtl.jsonOutHandler(err && err instanceof Exception ? err : (err && err.message ? err.message : err), null, res);
    next();
  });

  server = app.listen(config.listeningPort, () => {
    appUtl.log.info(`Extension service is listening on: ${config.listeningPort}`);
  }).on('error', function(err) {
    appUtl.log.error(err.message);
  });
}

async function initEngine() {
  if (app !== null) {
    throw new Exception('Express is already initialized');
  }

  app = express();

  app.use(morgan("short", {
    stream: appUtl.httpStream
  }));

  app.use(bodyParser.json({ limit: '3mb' }));
  app.use(bodyParser.urlencoded({ limit: '3mb', extended: true }));

  app.use(cors());
  app.use(compression({ threshold: 300 }));
  await require('./app/API/' + config.apiVersion).initialize(app);
}


initEngine();
initExpress();


