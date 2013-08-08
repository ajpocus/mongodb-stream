var MongoClient = require('mongodb').MongoClient,
  util = require('util'),
  stream = require('stream');

function MongoStream(opts) {
  stream.Writable.call(this, opts);
  
  if (!opts) { opts = {}; }
  this._index = 1;
  this._max = opts.max || 1000000;
  this._db = opts.databaseUri || "mongodb://localhost/mongostream";
  this._collection = opts.collection || "mongostream";
}
util.inherits(MongoStream, stream.Writable);

MongoStream.prototype._write = function (chunk, encoding, cb) {
  
};

exports = module.exports = MongoStream;