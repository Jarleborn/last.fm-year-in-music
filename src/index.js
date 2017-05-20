const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http').Server(app);
import key from './lib/key'
import {getStuff} from './modules/caller'
const cors = require('cors')

console.log(key)
http.listen(8000);

app.use(cors())
app.use(bodyParser.json());
// app.all('/', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

 app.post('/getTop', function (req, res) {
   console.log(req.body);
  getStuff(req.body.resObj.to, req.body.resObj.from, req.body.resObj.user)
  .then(function (result) {
    res.send(result.weeklyartistchart)
  })
 });
