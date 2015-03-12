//TODO: Add validation
//TODO: Add queries and streams

var util    = require('util'),
    winston = require('winston'),
    r       = require('rethinkdbdash')();

var RethinkDb = exports.RethinkDb = function(options) {

    options = options || {};

    if (options.dbhost) {
        r.createPool({
            host: options.dbhost,
            port: options.dbport
        });
    }

    this.name       = options.name || 'rethinkdb';
    this.level      = options.level || 'info';
    this.db         = options.db;
    this.collection = options.collection;

    winston.Transport.call(this, options);

    r.dbCreate(this.db).run();

    r.db(this.db).tableCreate(this.collection).run();
};

util.inherits(RethinkDb, winston.Transport);

winston.transports.RethinkDb = RethinkDb;

RethinkDb.prototype.log = function(level, msg, meta, callback) {
    r.db(this.db).table(this.collection).insert({
        level: level,
        message: msg,
        timestamp: new Date(),
        metadata: meta
    }).run().then(function() {
        callback(null, true);
    });
};

module.exports = RethinkDb;