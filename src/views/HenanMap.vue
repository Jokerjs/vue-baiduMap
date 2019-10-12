<template>
    <div>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <div id="chartsMap"></div>
    </div>
</template>

<script>
import 'echarts/extension/bmap/bmap'
import { decode, coordinatesMax } from '@/utils/parseGeoJson'
export default {
  name: 'HenanMap',
  data () {
    return {
      center: [113.6517370560, 34.7411716416],
      zoom: 8,
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
          roam: this.roam,
          mapStyle: {
            'styleJson': [
              {
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#031628'
                }
              },
              {
                'featureType': 'land',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#000102'
                }
              },
              {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'arterial',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#0b3d51'
                }
              },
              {
                'featureType': 'local',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'railway',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#08304b'
                }
              },
              {
                'featureType': 'subway',
                'elementType': 'geometry',
                'stylers': {
                  'lightness': -70
                }
              },
              {
                'featureType': 'building',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'all',
                'elementType': 'labels.text.fill',
                'stylers': {
                  'color': '#857f7f'
                }
              },
              {
                'featureType': 'all',
                'elementType': 'labels.text.stroke',
                'stylers': {
                  'color': '#000000'
                }
              },
              {
                'featureType': 'building',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#022338'
                }
              },
              {
                'featureType': 'green',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#062032'
                }
              },
              {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                  'color': '#465b6c'
                }
              },
              {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'color': '#022338'
                }
              },
              {
                'featureType': 'label',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }
            ]
          }
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
        series: [
          {
            name: '河南省',
            type: 'custom',
            coordinateSystem: 'bmap',
            renderItem: this.renderItem,
            itemStyle: {
              color: 'rgb(20, 134, 140, 0.4)',
              borderWidth: 1,
              borderColor: '#5f6769'
            },
            label: {
              normal: {
                formatter: '{c}',
                position: ['45%', '50%'],
                color: '#ffffff',
                fontSize: '14',
                show: true
              }
            },
            data: this.customData,
            z: -10
          }
        ]
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
      return this.axios.get('/static/city/henan.json').then((res) => {
        const resData = res.data
        const response = decode(resData)
        console.log(response)
        const nameArr = [].concat.apply([], response.features.map((a) => {
          return a.properties.name
        }))

        const RenderItemArr = [].concat.apply([], response.features.map((a) => {
          const geometry = a.geometry
          const coordinates = geometry.coordinates

          if ( geometry.type === "Polygon" ){

            return coordinates

          } else if( geometry.type === 'MultiPolygon' ) {

            return coordinatesMax(coordinates)

          }

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
    height: 900px;
    border: 1px solid #ccc;
  }
</style>
