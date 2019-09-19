<template>
    <div class="charts">
      <div id="line"></div>
    </div>
</template>

<script>
export default {
  name: 'charts',
  data () {
    return {
      myChart: null,
      lineData: null
    }
  },
  mounted () {
    this.getLineData()
  },
  methods: {
    getLineData () {
      if (this.$store.getters.city) {
        this.lineData = this.$store.getters.city.features
        this.setLine()
      } else {
        this.$store.dispatch('GetCity').then((response) => {
          this.lineData = response.features
          this.setLine()
        })
      }
    },
    setLine () {
      let cityArr = this.lineData.map((city) => {
        return city.properties.name
      })
      let cityLng = this.lineData.map((city) => {
        return city.geometry.coordinates[0][0][0][0] - 115
      })
      let myChart = this.$echarts.init(document.getElementById('line'))
      this.myChart = myChart
      let option = {
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        }, {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: cityArr.length - 1
        }],
        title: [{
          left: 'center',
          text: '北京市行政经度'
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: cityArr
        }],
        yAxis: [{
          splitLine: {show: false}
        }],
        grid: [{
          bottom: '10%'
        }],
        series: [{
          type: 'line',
          showSymbol: false,
          data: cityLng
        }]
      }
      this.myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
  .charts{
    width: 100%;
    height: 380px;
    padding: 15px;
    #line{
      width: 100%;
      height: 100%;
    }
  }
</style>
