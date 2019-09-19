<template>
  <div style="width: 100%; height: 100%;" id="container"></div>
</template>

<script>
export default {
  name: 'JMap',
  props: {
    zoom: {
      type: String,
      default: '10'
    },
    center: {
      type: Object,
      default () {
        return { lng: 116.3964, lat: 39.9093 }
      }
    },
    scroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.setMap()
  },
  methods: {
    setMap () {
      const map = new window.BMap.Map('container')
      const point = new window.BMap.Point(this.center.lng, this.center.lat)
      map.centerAndZoom(point, this.zoom)
      if (this.scroll) map.enableScrollWheelZoom()
    }
  }
}
</script>

<style scoped>

</style>
