const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const appUtl = require('../utils/app-utl');
const config = require('../../config');
const options = config.mongoDB;

const url = `${options.host}/${options.database}?${options.configs}`;

mongoose.connection.on('error', function (err) {
    appUtl.log.error("Cannot connect to mongoDB");
});

mongoose.connection.once('open', function (callback) {
    appUtl.log.debug(`Connection to database is established (${url})`);
});

mongoose.set('debug', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

if (options.authData) {
    mongoose.connect(url, options.authData);
} else {
    mongoose.connect(url);
}

mongoose.Promise = global.Promise;

mongoose.plugin(timestamps, {
    createdAt: {name: 'created', index: true},
    updatedAt: {name: 'updated', index: true}
});

module.exports = mongoose;
