<template>
  <div class="map">
    <j-map :zoom="zoom" :center="lnglat" :scroll="scroll"></j-map>
  </div>
</template>

<script>
import JMap from '../components/JMap/JMap'
export default {
  name: 'Imap',
  components: {JMap},
  data () {
    return {
      lnglat: { lng: 116.3964, lat: 39.9093 },
      zoom: '14',
      scroll: true
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .map{
    width: 100%;
    height: 450px;
    border: 1px solid #ccc;
  }
</style>
