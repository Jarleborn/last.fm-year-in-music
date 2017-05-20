<template lang="html">
  <div class="field">
    <input v-model="searchtext"  type="text" placeholder="username on Last.fm" name="Username on Last.fm" value="" />
    <button @click="getInfo(searchtext)" type="button" name="button"> How Long does It Take to watch</button>
    <div v-if="ok" class="">
      <h1>{{ name }}</h1>
      <ol>
        <li v-for="artist in body">
          <h2>{{artist.name}}</h2>
          <p>{{artist.playcount}}</p>
          <img :src="getImageTad(artist.mbid, artist.name)" />
          <p>{{getImageTad(artist.mbid, artist.name)}}</p>
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
    getInfo(searchtext) {
      const that = this
      const resObj = this.calcTime()
      resObj.user = searchtext
      this.name = searchtext
      // const that = this
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
        // console.log(res);
        for (let i = 0; i < 5; i += 1) {
          that.body.push({
            name: res.artist[i].name,
            playcount: res.artist[i].playcount,
            pic: that.getImageTad(res.artist[i].mbid, res.artist[i].name),
          })
        }
      })
      that.ok = true
      console.log(that.body);
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
      console.log(artistName);
      let url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=' + mbid + '&api_key=42945819213669931e01a3d4732c68f2&format=json'
      if (!artistName.includes('&')) {
        url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistName + '&api_key=42945819213669931e01a3d4732c68f2&format=json'
      }
      fetch(url, {
        method: 'get',
      }).then((response) => {
        return response.json()
      }).then((data) => {
        return data.artist.image[1]['#text']
      })
    },
  },
}
</script>
