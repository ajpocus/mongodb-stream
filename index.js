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
  var self = this;
  var data = JSON.parse(chunk.toString());
  MongoClient.connect(self._db, function (err, db) {
    if (err) { return cb(err); }
    var collection = db.collection(self._collection);
    collection.insert(data, function (err, docs) {
      if (err) { return cb(err); }
      
      self._index += 1;
      if (self._index >= self._max) { self.end(); }
      return cb();
    });
  });
};

exports = module.exports = MongoStream;