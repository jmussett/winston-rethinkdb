//TODO: Add appropriate error assertions

var assert = require('assert');
var winston = require('winston');
var RethinkDb = require('../lib/winston-rethinkdb');

describe('winston-rethinkdb-test', function() {
    before(function() {
        winston.add(RethinkDb, {
            db: 'test',
            collection: 'winston',
            dbhost: 'localhost',
            dbport: 28015
        });
    });
    it('should log', function() {
        winston.log('info', 'test');
    });
});