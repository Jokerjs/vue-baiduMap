<template>
  <div class="map">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  name: 'MyMap',
  data () {
    return {
      point: {
        lng: '116.3964',
        lat: '39.9093',
        zoom: '9'
      },
      map: null,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.setMap()
    this.setRegion()
    this.setHeatmap()
  },
  methods: {
    setMap () {
      const map = new window.BMap.Map('container')
      const point = new window.BMap.Point(this.point.lng, this.point.lat)
      this.map = map
      this.map.centerAndZoom(point, this.point.zoom)
      this.map.enableScrollWheelZoom(true)
    },

    setRegion () {
      this.$store.dispatch('GetCity').then((response) => {
        const data = response.features
        for (let i = 0; i < data.length; i++) {
          const Region = data[i].geometry.coordinates[0][0].join(';')
          let ply = new window.BMap.Polygon(Region, {
            strokeWeight: 2,
            strokeColor: '#1089ff',
            fillOpacity: 0.4,
            fillColor: '#52de97'
          })
          this.map.addOverlay(ply)
        }
      })
    },

    setHeatmap () {
      this.$store.dispatch('GetHeat').then((response) => {
        const data = response.data
        /* const gradient = {
          0: 'rgb(102, 255, 0)',
          0.5: 'rgb(255, 170, 0)',
          1: 'rgb(255, 0, 0)'
        } */
        let heatmapOverlay = new window.BMapLib.HeatmapOverlay({'radius': 15})
        this.map.addOverlay(heatmapOverlay)
        heatmapOverlay.setDataSet({data: data, max: 100})
        // heatmapOverlay.setOptions({'gradient': gradient})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #container{
    width: 100%;
    height: 450px;
    border: 1px solid #ccc;
  }
</style>
