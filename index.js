
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
