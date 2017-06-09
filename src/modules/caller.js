import key from '../lib/key'
const fetch = require('node-fetch')

 function getStuff(to, from, user){
    return new Promise(function(resolve, reject) {
      fetch("http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user="+user+"&api_key="+key.key+"&from='"+from+"'&to='"+to+"'&format=json&limit=5")
      .then(function(res) {
          return res.json();
      }).then(function(body) {
        if (!body) {
          reject('eeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrror')
        }
          console.log(body.weeklyartistchart.artist);
          resolve(body)
      });
    });

}

export {getStuff}
