import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Layout,
      redirect: 'my-map',
      children: [{
        path: 'my-map',
        component: _import('MyMap'),
        name: 'MyMap',
        meta: {
          title: '地图'
        }
      },
      {
        path: 'charts',
        component: _import('Charts'),
        name: 'Charts',
        meta: {
          title: 'Charts'
        }
      },
      {
        path: 'echarts-map',
        component: _import('EchartsMap'),
        name: 'EchartsMap',
        meta: {
          title: 'EchartsMap'
        }
      },
      {
        path: 'henan-map',
        component: _import('HenanMap'),
        name: 'HenanMap',
        meta: {
          title: 'HenanMap'
        }
      },
      {
        path: 'zhengzhou-map',
        component: _import('ZhengzhouMap'),
        name: 'ZhengzhouMap',
        meta: {
          title: 'ZhengzhouMap'
        }
      },
      {
        path: 'jinshui-map',
        component: _import('JinshuiMap'),
        name: 'JinshuiMap',
        meta: {
          title: 'JinshuiMap'
        }
      }]
    }
  ]
})
