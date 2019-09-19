<template>
    <div>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <div id="chartsMap"></div>
    </div>
</template>

<script>
import 'echarts/extension/bmap/bmap'
export default {
  name: 'EchartsMap',
  data () {
    return {
      center: [120.13066322374, 30.240018034923],
      zoom: 10,
      roam: true,
      customData: [],
      RenderItems: [],
      heatData: [],
      spinShow: false
    }
  },
  mounted () {
    this.setLine()
  },
  methods: {
    async setLine () {
      this.spinShow = true
      let lineData = await this.LineData()
      let customData = await this.CustomData()
      this.heatData = lineData
      this.customData = customData.nameArr
      this.RenderItems = customData.RenderItemArr
      this.spinShow = false
      let myChart = this.$echarts.init(document.getElementById('chartsMap'))
      let option = {
        animation: false,
        bmap: {
          center: this.center,
          zoom: this.zoom,
          roam: this.roam
        },
        visualMap: {
          show: false,
          top: 'top',
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['blue', 'blue', 'green', 'yellow', 'red']
          }
        },
        tooltip: {
          formatter: '{a} : {c}'
        },
        series: [{
          type: 'heatmap',
          coordinateSystem: 'bmap',
          data: this.heatData,
          pointSize: 5,
          blurSize: 6
        },
        {
          name: '杭州市',
          type: 'custom',
          coordinateSystem: 'bmap',
          renderItem: this.renderItem,
          itemStyle: {
            opacity: 0.5,
            color: '#1089ff',
            borderWidth: 2,
            borderColor: '#000000'
          },
          data: this.customData,
          z: -10
        }]
      }
      myChart.setOption(option, true)
    },
    LineData () {
      return this.$store.dispatch('GetHzHeat').then((response) => {
        const points = [].concat.apply([], response.map((track) => {
          return track.map(function (seg) {
            return seg.coord.concat([1])
          })
        }))
        return points
      })
    },
    CustomData () {
      return this.$store.dispatch('GetHzCity').then((response) => {
        const nameArr = [].concat.apply([], response.features.map((names) => {
          return names.properties.name
        }))
        const RenderItemArr = [].concat.apply([], response.features.map((names) => {
          return names.geometry.coordinates[0]
        }))
        return {nameArr, RenderItemArr}
      })
    },
    renderItem (params, api) {
      let coords = this.RenderItems[params.dataIndex]
      let points = []
      for (var i = 0; i < coords.length; i++) {
        points.push(api.coord(coords[i]))
      }
      return {
        type: 'polygon',
        shape: {
          points: points
        },
        style: api.style()
      }
    }
  }
}
</script>

<style scoped>
  #chartsMap{
    width: 100%;
    height: 450px;
    border: 1px solid #ccc;
  }
</style>
