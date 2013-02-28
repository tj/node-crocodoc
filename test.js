
var Client = require('./');
var client = new Client(process.argv[2]);

client.url('http://i.cloudup.com/g5rLSt.xls', function(err, res){
  if (err) throw err;
  console.log(res);

  client.status(res.uuid, function(err, status){
    if (err) throw err;
    console.log(status);
  });
});
