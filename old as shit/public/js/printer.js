const printer = {
  getImageTag: function (mbid, artistName) {
    // console.log(mbid)
    return new Promise(function(resolve, reject) {
      let url = "";
      if(!artistName.includes("&")){
        url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artistName+'&api_key=42945819213669931e01a3d4732c68f2&format=json'
      }else{
        url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid='+mbid+'&api_key=42945819213669931e01a3d4732c68f2&format=json'
      }
      // console.log(url)
      fetch(url, {
        method: 'get'
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        const res = data.artist.image[1]['#text'];
        // console.log(res)
        resolve(data.artist.image[1]['#text']);
        //return res;
      })
    });
  },
  collect: function (object) {

    var arr = new Array();
    var obj = new Object();
    // console.log(object);


    for (var i = 0; i < 5; i++ ) {
      const mbid = object[i].mbid;
      const name = object[i].name;
      const pConut = object[i].playcount;
      const counter = i +1;

      printer.getImageTag(mbid, name).then(function (response) {
        // console.log(printer.getImageTag(name))

        arr.push( {
          name: name,
          mbid: mbid,
          playConut: pConut,
          link: object[i].url,
          img: response
        })

        if(arr.length == 5){
          printer.print(arr)}
      })
    }


  },
  print: function (artist) {
    const list = document.querySelector('.collection');
    artist.sort(function(b, a) {
    return parseFloat(a.playConut) - parseFloat(b.playConut);
})
    for (var i = 0; i < artist.length; i++) {
      // console.log(artist[i])
      const aTag = document.createElement("a");
      const imgTag = document.createElement("img");
      const textN = document.createTextNode("       " + artist[i].name);
      const textN2 = document.createTextNode("       " + artist[i].playConut);

      aTag.className = "collection-item";
      aTag.setAttribute("href", artist[i].link);
      imgTag.setAttribute("src", artist[i].img);
      aTag.setAttribute("target","_blank");

      aTag.appendChild(imgTag);
      aTag.appendChild(textN);
      aTag.appendChild(textN2);
      list.appendChild(aTag);

    }

  }

}
