
/**
 * Module dependencies.
 */

var request = require('superagent');

module.exports = Client;

function Client(key) {
  if (!key) throw new TypeError('api key required');
  this.remote = 'https://crocodoc.com/api/v2';
  this.key = key;
}

Client.prototype.url = function(url, fn){
  request
  .post(this.remote + '/document/upload')
  .type('form-data')
  .send({ token: this.key, url: url })
  .end(function(err, res){
    if (err) return fn(err);
    if (res.error) return fn(new Error(res.body.error));
    fn(null, res.body);
  });
};

Client.prototype.status = function(id, fn){
  request
  .get(this.remote + '/document/status')
  .query({ token: this.key, uuids: id })
  .end(function(err, res){
    if (err) return fn(err);
    if (res.error) return fn(new Error(res.body.error));
    fn(null, res.body);
  });
};

Client.prototype.thumb = function(id, w, h, fn){
  var size = w + 'x' + h;

  request
  .get(this.remote + '/download/thumbnail')
  .query({ token: this.key, uuid: id, size: size })
  .end(function(err, res){
    if (err) return fn(err);
    if (res.error) return fn(new Error(res.body.error));
    var len = ~~res.header['content-length'];
    var bufs = [];
    res.on('data', function(chunk){ bufs.push(chunk) });
    res.on('end', function(){
      fn(null, Buffer.concat(bufs));
    });
  });
};
