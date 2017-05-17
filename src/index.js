const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http').Server(app);
import key from './lib/key'

console.log(key)
http.listen(8000);

app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

 app.get('/', function (req, res) {
 
 });

