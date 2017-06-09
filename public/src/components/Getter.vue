<template lang="html">
  <div class="field">
    <input v-model="searchtext"  type="text" placeholder="username on Last.fm" name="Username on Last.fm" value="" />
    <button @click="init(searchtext)" type="button" name="button"> How Long does It Take to watch</button>
    <div v-if="ok" class="">
      <h1>{{ name }}</h1>
      <ol>
        <li v-for="artist in body.sort()" >
          <h2>{{artist.name}}</h2>
          <p>{{artist.playcount}}</p>
          <img :src="artist.pic" />
        </li>
      </ol>

    </div>

  </div>
</template>


<script>
export default {
  name: 'getter',
  data() {
    return {
      body: [],
      ok: false,
      name: '',
    }
  },
  methods: {
    init(text) {
      const that = this
      that.getInfo(text)
      .then((yo) => {
        console.log(yo);
        data.body = yo
        that.ok = true
      })
    },
    getInfo(searchtext) {
      return new Promise((resolve) => {
        const that = this
        const resObj = this.calcTime()
        resObj.user = searchtext
        this.name = searchtext
        // const that = this
        const superObj = []
        fetch('http://localhost:8000/getTop',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              resObj,
            }),
          })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          for (let i = 0; i < 5; i += 1) {
            that.getImageTad(res.artist[i].mbid, res.artist[i].name)
            .then((link) => {
              superObj[i] = ({
                name: res.artist[i].name,
                playcount: res.artist[i].playcount,
                pic: link,
              })
              console.log(superObj)
            })
            .catch((err) => {
              console.log(err);
            })
          }
          resolve(superObj)
        })
      })
    },
    sort(obj) {
      console.log(obj);
      const obj2 = obj
      for (let a = 1; a < obj2.length; a += 1) {
        for (let b = 0; b < obj2.length - a; b += 1) {
          if (((obj2[b].playcount)
          .compareTo((obj2[b + 1].playcount))) > 0) {
            const temp = obj2[b];
            obj2[b] = obj2[b + 1];
            obj2[b + 1] = temp;
          }
        }
      }
      console.log(obj2);
      return obj2
    },
    calcTime() {
      const myDate2 = new Date()
      const myEpoch2 = myDate2.getTime() / 1000.0
      const d = new Date(new Date().getFullYear(), 0, 1)
      const myEpoch = d.getTime() / 1000.0
      return {
        to: myEpoch2,
        from: myEpoch,
      }
    },
    getImageTad(mbid, artistName) {
      return new Promise((resolve, reject) => {
        let url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=' + mbid + '&api_key=42945819213669931e01a3d4732c68f2&format=json'
        if (!artistName.includes('&')) {
          url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistName + '&api_key=42945819213669931e01a3d4732c68f2&format=json'
        }
        fetch(url, {
          method: 'get',
        }).then((response) => {
          return response.json()
        }).then((data) => {
          if (!data.artist) {
            reject('#')
          }
          resolve(data.artist.image[2]['#text'])
        })
      })
    },
  },
}
</script>
