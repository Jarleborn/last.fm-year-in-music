var express = require('express');
var app = express();
var http = require('http').Server(app);
http.listen(8000);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.static(__dirname + '/public'));
app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

 app.get('/', function (req, res) {
   res.sendfile(__dirname + '/public/index.html');
 });

app.post('/reg', function (req, res) {
  console.log(req.body)

})
