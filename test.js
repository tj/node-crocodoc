
var Client = require('./');
var client = new Client(process.argv[2]);

client.url('http://i.cloudup.com/g5rLSt.xls', function(err){
  if (err) throw err;
});
