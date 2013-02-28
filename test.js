
var Client = require('./');
var client = new Client(process.argv[2]);
var fs = require('fs');

client.url('http://i.cloudup.com/g5rLSt.xls', function(err, res){
  if (err) throw err;
  console.log(res);

  client.status(res.uuid, function(err, status){
    if (err) throw err;
    console.log(status);
  });
});

// client.thumb('a805033b-6043-4687-9639-b8fa7fd3c076', 300, 300, function(err, buf){
//   if (err) throw err;
//   console.log('write ./out.png');
//   fs.writeFile('out.png', buf);
// });
