const caller = {
  // printer: require('printer.js'),
  call: function (to, from) {
    fetch('http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=theroyallemming&from='+to+'&to='+from+'&api_key=42945819213669931e01a3d4732c68f2&format=json', {
      method: 'get'
    }).then(function(response) {
      return response.json();
    }).then(function(data) {

      console.log(data.weeklyartistchart.artist)
      printer.collect(data.weeklyartistchart.artist)
    })
  },

}
